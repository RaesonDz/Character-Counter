# Garren — Projects & Tools Showcase

**Author:** IMeD TaDJ EDDiNe  
**Node:** v20+ (tested)  

## Features
- Upload ZIP projects; server validates `index.html` exists.
- Projects extracted under `/private_projects/<slug>/` and served only via `/p/<slug>/`.
- Admin panel to manage projects, subscribers, socials, and change admin password.
- Secure token-based authentication (x-auth header), hashed tokens stored server-side.
- Rate-limited login & upload endpoints.
- Sitemap & robots.txt auto-updated.
- Tests with Jest + Supertest. CI workflow included.
- Dockerfile & nginx sample config.

## Quick start (development)
1. Clone repo and `cd` into folder.
2. `npm install`
3. Start: `npm start` (or `npm run dev` for nodemon)

Default server runs on `http://localhost:3000`.

> On first run, if `assets/data/users.json` wasn't present, a default admin user will be created and the default password printed to console (change it at first login via Settings page).

### Environment variables
- `PORT` — server port (default 3000)
- `SESSION_SECRET` — recommended for session logic (not required for token method)
- `SITE_HOST` — optionally used in sitemap generation (e.g. `https://example.com`)

## Admin
Open `/admin/login.html` to authenticate. On successful login the server returns a token — stored in browser by the admin UI and sent as `x-auth` header automatically.

## Uploading project (curl example)
Create a sample zip (we included `samples/create_sample_zip.js` to generate `samples/sample_project.zip`):

```bash
node samples/create_sample_zip.js
# then:
curl -v -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"username":"admin","password":"<your-password>"}'
# response {"token":"..."}
# then upload:
curl -X POST http://localhost:3000/api/projects/upload \
 -H "x-auth: <TOKEN>" \
 -F "title=Sample Project" \
 -F "description=My demo project" \
 -F "zipfile=@samples/sample_project.zip" \
 -F "thumbnail=@samples/sample_thumbnail.jpg"
