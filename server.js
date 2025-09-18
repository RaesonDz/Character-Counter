// server.js
const express = require('express');
const multer = require('multer');
const AdmZip = require('adm-zip');
const fs = require('fs-extra');
const path = require('path');
const sanitize = require('sanitize-filename');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');
const mime = require('mime-types');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
const { URL } = require('url');

const DATA_DIR = path.join(__dirname, 'assets', 'data');
const PRIVATE_DIR = path.join(__dirname, 'private_projects');
const UPLOADS_TEMP = path.join(__dirname, 'uploads-temp');
const LOG_DIR = path.join(__dirname, 'logs');
const AUDIT_LOG = path.join(LOG_DIR, 'audit.log');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

fs.ensureDirSync(DATA_DIR);
fs.ensureDirSync(PRIVATE_DIR);
fs.ensureDirSync(UPLOADS_TEMP);
fs.ensureDirSync(LOG_DIR);
fs.ensureFileSync(AUDIT_LOG);

// Helper load JSON
const readJSON = (p, def) => {
  try {
    if (!fs.existsSync(p)) return def;
    return fs.readJsonSync(p);
  } catch (e) {
    return def;
  }
};
const writeJSON = (p, data) => fs.writeJsonSync(p, data, { spaces: 2 });

const USERS_PATH = path.join(DATA_DIR, 'users.json');
const PROJECTS_PATH = path.join(DATA_DIR, 'projects.json');
const SUBSCR_PATH = path.join(DATA_DIR, 'subscribers.json');
const SOCIAL_PATH = path.join(DATA_DIR, 'social.json');
const TOKENS_PATH = path.join(DATA_DIR, 'tokens.json'); // store hashed tokens

// init data files if missing
if (!fs.existsSync(USERS_PATH)) {
  // create default admin with random strong default
  const defaultPassword = 'ChangeMe#Garren2025!';
  const hash = bcrypt.hashSync(defaultPassword, 12);
  writeJSON(USERS_PATH, [{ username: 'admin', passwordHash: hash }]);
  console.log('Created users.json with default admin user (username: admin). Default password printed below - change immediately:');
  console.log('DEFAULT ADMIN PASSWORD:', defaultPassword);
} else {
  const u = readJSON(USERS_PATH, []);
  if (!u.find(x => x.username === 'admin')) {
    const defaultPassword = 'ChangeMe#Garren2025!';
    const hash = bcrypt.hashSync(defaultPassword, 12);
    u.push({ username: 'admin', passwordHash: hash });
    writeJSON(USERS_PATH, u);
    console.log('Added default admin user to users.json. Default password:', defaultPassword);
  }
}
if (!fs.existsSync(PROJECTS_PATH)) writeJSON(PROJECTS_PATH, []);
if (!fs.existsSync(SUBSCR_PATH)) writeJSON(SUBSCR_PATH, []);
if (!fs.existsSync(SOCIAL_PATH)) writeJSON(SOCIAL_PATH, {
  github: "https://github.com/yourhandle",
  telegram: "https://t.me/yourhandle",
  facebook: "https://facebook.com/yourhandle",
  instagram: "https://instagram.com/yourhandle"
});
if (!fs.existsSync(TOKENS_PATH)) writeJSON(TOKENS_PATH, []);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  message: { error: "Too many login attempts, try later." }
});
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: "Too many uploads, slow down." }
});

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_TEMP),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${sanitize(file.originalname)}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // general max default (ZIP)
});

// audit logger
function auditLog(event, details) {
  const line = `[${new Date().toISOString()}] ${event} ${JSON.stringify(details || {})}\n`;
  fs.appendFile(AUDIT_LOG, line).catch(console.error);
}

// token helpers
function makeToken() { return uuidv4(); }
function storeToken(username, token) {
  const tokens = readJSON(TOKENS_PATH, []);
  const hashed = bcrypt.hashSync(token, 10);
  tokens.push({ username, tokenHash: hashed, createdAt: new Date().toISOString() });
  writeJSON(TOKENS_PATH, tokens);
  return true;
}
function deleteToken(token) {
  let tokens = readJSON(TOKENS_PATH, []);
  tokens = tokens.filter(t => !bcrypt.compareSync(token, t.tokenHash));
  writeJSON(TOKENS_PATH, tokens);
}
function verifyToken(token) {
  const tokens = readJSON(TOKENS_PATH, []);
  for (const t of tokens) {
    if (bcrypt.compareSync(token, t.tokenHash)) return t.username;
  }
  return null;
}

// auth middleware
function requireAuth(req, res, next) {
  const token = req.get('x-auth') || req.cookies?.auth || null;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const username = verifyToken(token);
  if (!username) return res.status(401).json({ error: "Invalid token" });
  req.user = { username };
  next();
}

// Helpers: slug generation
function generateSlug(base) {
  base = base || 'project';
  base = base.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  let slug = sanitize(base) || `project-${Date.now()}`;
  const projects = readJSON(PROJECTS_PATH, []);
  let counter = 0;
  while (projects.find(p => p.slug === slug)) {
    counter++;
    slug = `${base}-${counter}`;
  }
  return slug;
}

// Validate storeLink (basic)
function validateStoreLink(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return url;
  } catch (e) {
    return null;
  }
}

// Update sitemap
function updateSitemap() {
  const projects = readJSON(PROJECTS_PATH, []);
  const host = process.env.SITE_HOST || '';
  const urls = [
    `${host || ''}/`,
    ...projects.map(p => `${host || ''}/p/${p.slug}/`)
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `<url><loc>${u}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`).join('\n')}
  </urlset>`;
  fs.writeFileSync(SITEMAP_PATH, xml);
}

// Public data endpoint
app.get('/api/data', (req, res) => {
  const projects = readJSON(PROJECTS_PATH, []);
  const subs = readJSON(SUBSCR_PATH, []);
  const socials = readJSON(SOCIAL_PATH, {});
  res.json({ projects, subscribersCount: subs.length, socials });
});

// Subscribe
app.post('/api/subscribe', (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    const subs = readJSON(SUBSCR_PATH, []);
    if (subs.find(s => s.email === email)) {
      return res.status(409).json({ error: "Email already subscribed" });
    }
    subs.push({ email, createdAt: new Date().toISOString() });
    writeJSON(SUBSCR_PATH, subs);
    auditLog('subscribe', { email });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// Login
app.post('/api/login', loginLimiter, (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: "Missing credentials" });
    const users = readJSON(USERS_PATH, []);
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ error: "Invalid username or password" });
    if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ error: "Invalid username or password" });
    const token = makeToken();
    storeToken(username, token);
    auditLog('login', { username });
    // return token to client; instruct storing in localStorage and sending x-auth
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  const token = req.get('x-auth') || null;
  if (token) {
    deleteToken(token);
    auditLog('logout', {});
  }
  res.json({ success: true });
});

// Change password
app.post('/api/change-password', requireAuth, (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body || {};
    if (!oldPassword || !newPassword) return res.status(400).json({ error: "Missing fields" });
    const users = readJSON(USERS_PATH, []);
    const user = users.find(u => u.username === req.user.username);
    if (!user) return res.status(500).json({ error: "User record missing" });
    if (!bcrypt.compareSync(oldPassword, user.passwordHash)) return res.status(401).json({ error: "Old password incorrect" });
    user.passwordHash = bcrypt.hashSync(newPassword, 12);
    writeJSON(USERS_PATH, users);
    auditLog('change-password', { username: req.user.username });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// GET projects (admin/public)
app.get('/api/projects', (req, res) => {
  // always return projects array (admin may have more but same here)
  res.json({ projects: readJSON(PROJECTS_PATH, []) });
});

// Upload project
const uploadFields = upload.fields([
  { name: 'zipfile', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);
app.post('/api/projects/upload', requireAuth, uploadLimiter, (req, res) => {
  try {
    uploadFields(req, res, async function (err) {
      if (err) return res.status(400).json({ error: "Upload error", detail: err.message });
      const title = (req.body.title || '').trim();
      const description = (req.body.description || '').trim();
      const storeLinkRaw = (req.body.storeLink || '').trim();
      const storeLink = validateStoreLink(storeLinkRaw) || null;

      if (!req.files || !req.files.zipfile || req.files.zipfile.length === 0) {
        return res.status(400).json({ error: "Missing zipfile" });
      }
      const zipFile = req.files.zipfile[0];
      if (zipFile.size > 100 * 1024 * 1024) return res.status(400).json({ error: "ZIP too large" });

      // read zip
      const zip = new AdmZip(zipFile.path);
      const entries = zip.getEntries();
      const hasIndex = entries.some(e => e.entryName.toLowerCase().endsWith('index.html'));
      if (!hasIndex) {
        // cleanup
        await fs.remove(zipFile.path);
        if (req.files.thumbnail) await fs.remove(req.files.thumbnail[0].path);
        return res.status(400).json({ error: "ZIP missing index.html" });
      }

      // slug
      const baseName = title || path.basename(zipFile.originalname, path.extname(zipFile.originalname));
      const slugBase = sanitize(baseName.replace(/\s+/g, '-').toLowerCase()) || `project-${Date.now()}`;
      const slug = generateSlug(slugBase);

      const projectDir = path.join(PRIVATE_DIR, slug);
      fs.ensureDirSync(projectDir);

      // extract
      zip.extractAllTo(projectDir, true);

      // move thumbnail if provided
      let thumbnailPath = null;
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        const th = req.files.thumbnail[0];
        if (th.size > 5 * 1024 * 1024) {
          await fs.remove(projectDir);
          await fs.remove(zipFile.path);
          await fs.remove(th.path);
          return res.status(400).json({ error: "Thumbnail too large" });
        }
        const ext = path.extname(th.originalname);
        const dest = path.join(projectDir, `thumbnail${ext}`);
        await fs.move(th.path, dest, { overwrite: true });
        thumbnailPath = `/p/${slug}/thumbnail${ext}`;
      }

      // build JSON entry
      const projects = readJSON(PROJECTS_PATH, []);
      const id = uuidv4();
      const createdAt = new Date().toISOString();
      const record = {
        id,
        slug,
        title: title || baseName,
        description,
        link: `/p/${slug}/`,
        thumbnail: thumbnailPath || null,
        storeLink, // can be null or validated url
        createdAt
      };
      projects.unshift(record);
      writeJSON(PROJECTS_PATH, projects);

      // cleanup uploaded zip
      await fs.remove(zipFile.path);

      auditLog('upload-project', { id, slug, title, uploadedBy: req.user.username });
      updateSitemap();

      res.json({ success: true, project: record });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// Delete project
app.delete('/api/projects/:id', requireAuth, (req, res) => {
  try {
    const id = req.params.id;
    const projects = readJSON(PROJECTS_PATH, []);
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Project not found" });
    const [removed] = projects.splice(idx, 1);
    writeJSON(PROJECTS_PATH, projects);
    // delete folder
    const projectDir = path.join(PRIVATE_DIR, removed.slug);
    fs.removeSync(projectDir);
    updateSitemap();
    auditLog('delete-project', { id, slug: removed.slug, by: req.user.username });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// Serve project files via /p/:slug/* and serve index for /p/:slug/ or /p/:slug
function serveProjectFile(req, res, requestedRelative) {
  const slug = sanitize(req.params.slug);
  if (!slug) return res.status(400).json({ error: "Invalid slug" });
  const root = path.join(PRIVATE_DIR, slug);
  if (!fs.existsSync(root)) return res.status(404).json({ error: "Project not found" });

  const relative = requestedRelative || '';
  const requested = relative || 'index.html';
  const fullPath = path.join(root, requested);
  // prevent path traversal
  if (!fullPath.startsWith(root)) return res.status(403).json({ error: "Forbidden" });
  if (!fs.existsSync(fullPath)) return res.status(404).json({ error: "File not found" });
  const stat = fs.statSync(fullPath);
  const mimeType = mime.lookup(fullPath) || 'application/octet-stream';
  res.setHeader('Content-Type', mimeType);
  const stream = fs.createReadStream(fullPath);
  stream.pipe(res);
}

app.get('/p/:slug/*', (req, res) => {
  // req.params[0] contains the wildcard part
  const rel = req.params[0] || '';
  return serveProjectFile(req, res, rel);
});
app.get('/p/:slug', (req, res) => {
  return serveProjectFile(req, res, '');
});
app.get('/p/:slug/', (req, res) => {
  return serveProjectFile(req, res, '');
});

// socials
app.get('/api/socials', (req, res) => res.json(readJSON(SOCIAL_PATH, {})));
app.post('/api/socials', requireAuth, (req, res) => {
  try {
    const data = req.body || {};
    // keep only allowed keys
    const out = {
      github: data.github || '',
      telegram: data.telegram || '',
      facebook: data.facebook || '',
      instagram: data.instagram || ''
    };
    writeJSON(SOCIAL_PATH, out);
    auditLog('update-socials', { by: req.user.username, data: out });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// subscribers admin
app.get('/api/subscribers', requireAuth, (req, res) => {
  res.json(readJSON(SUBSCR_PATH, []));
});
app.delete('/api/subscribers/:email', requireAuth, (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    let subs = readJSON(SUBSCR_PATH, []);
    subs = subs.filter(s => s.email !== email);
    writeJSON(SUBSCR_PATH, subs);
    auditLog('delete-subscriber', { email, by: req.user.username });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// stats
app.get('/api/stats', requireAuth, (req, res) => {
  const projects = readJSON(PROJECTS_PATH, []);
  const subs = readJSON(SUBSCR_PATH, []);
  res.json({ projectsCount: projects.length, subscribersCount: subs.length });
});

// static admin & frontend assets
app.use('/admin/static', express.static(path.join(__dirname, 'admin')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', express.static(path.join(__dirname, '/')));

// robots & sitemap
app.get('/robots.txt', (req, res) => {
  const p = path.join(__dirname, 'robots.txt');
  if (fs.existsSync(p)) {
    res.type('text/plain').send(fs.readFileSync(p, 'utf8'));
  } else res.type('text/plain').send(`Sitemap: /sitemap.xml`);
});
app.get('/sitemap.xml', (req, res) => {
  if (fs.existsSync(SITEMAP_PATH)) res.type('application/xml').send(fs.readFileSync(SITEMAP_PATH));
  else res.status(404).send('Not found');
});

// default 404 JSON
app.use((req, res) => res.status(404).json({ error: "Not found" }));

// start
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  updateSitemap();
  app.listen(PORT, () => {
    console.log(`Garren server running on port ${PORT}`);
  });
}

module.exports = app;
