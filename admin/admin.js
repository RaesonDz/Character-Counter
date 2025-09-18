/* admin/admin.js
   Unified admin frontend logic for Garren
   - Uses x-auth header (token stored in localStorage under 'garren_token')
   - Pages handled: login, index (dashboard), projects, subscribers, socials, settings, stats
   - Charts use Chart.js (chart elements must exist in stats.html)
*/

(() => {
  const TOKEN_KEY = 'garren_token';

  // ---------- Utilities ----------
  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  function setToken(t) {
    localStorage.setItem(TOKEN_KEY, t);
  }
  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  async function apiFetch(path, opts = {}) {
    opts.headers = opts.headers || {};
    const token = getToken();
    if (token) opts.headers['x-auth'] = token;

    if (opts.body && !(opts.body instanceof FormData)) {
      if (!opts.headers['Content-Type']) opts.headers['Content-Type'] = 'application/json';
      if (opts.headers['Content-Type'] === 'application/json' && typeof opts.body !== 'string') {
        opts.body = JSON.stringify(opts.body);
      }
    }

    const res = await fetch(path, opts);
    if (res.status === 401) {
      clearToken();
      window.location.href = '/admin/login.html';
      throw new Error('Unauthorized');
    }

    let data = null;
    const text = await res.text();
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) {
      const message = (data && data.error) ? data.error : `Request failed (${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }
  function escapeHtml(s='') {
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
  function showMessage(container, msg, type='info') {
    if (!container) return;
    const color = type === 'error' ? 'danger' : (type === 'success' ? 'success' : 'muted');
    container.innerHTML = `<div class="text-${color} small">${escapeHtml(msg)}</div>`;
  }

  // ---------- Page init ----------
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.endsWith('/admin/login.html') || path.endsWith('/login.html')) {
      if (getToken()) {
        window.location.href = '/admin/index.html';
        return;
      }
      initLogin();
      return;
    }

    if (!getToken()) {
      window.location.href = '/admin/login.html';
      return;
    }

    qsa('#logout-btn, #btnLogoutTop, #btnLogoutSidebar').forEach(btn => {
      if (btn) btn.addEventListener('click', logout);
    });

    if (path.endsWith('/admin/index.html') || path.endsWith('/index.html')) initDashboard();
    if (path.endsWith('/admin/projects.html') || path.endsWith('/projects.html')) initProjects();
    if (path.endsWith('/admin/subscribers.html') || path.endsWith('/subscribers.html')) initSubscribers();
    if (path.endsWith('/admin/socials.html') || path.endsWith('/socials.html')) initSocials();
    if (path.endsWith('/admin/settings.html') || path.endsWith('/settings.html')) initSettings();
    if (path.endsWith('/admin/stats.html') || path.endsWith('/stats.html')) initStats();
  });

  // ---------- Login ----------
  function initLogin() {
    const form = qs('#login-form');
    if (!form) return;
    const feedback = document.createElement('div'); feedback.id = 'loginFeedback'; feedback.className = 'mt-2';
    form.appendChild(feedback);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = qs('#username').value.trim();
      const password = qs('#password').value.trim();
      showMessage(feedback, 'Logging in...', 'info');
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok) {
          showMessage(feedback, data.error || 'Login failed', 'error');
          return;
        }
        setToken(data.token);
        window.location.href = '/admin/index.html';
      } catch (err) {
        showMessage(feedback, err.message || 'Network error', 'error');
      }
    });
  }

  // ---------- Logout ----------
  async function logout() {
    try { await fetch('/api/logout', { method: 'POST', headers: { 'x-auth': getToken() } }); } catch {}
    clearToken();
    window.location.href = '/admin/login.html';
  }

  // ---------- Dashboard ----------
  async function initDashboard() {
    try {
      const stats = await apiFetch('/api/stats');
      qs('#total-projects') && (qs('#total-projects').textContent = stats.projectsCount ?? 0);
      qs('#total-subscribers') && (qs('#total-subscribers').textContent = stats.subscribersCount ?? 0);
    } catch (err) { console.error('Dashboard stats error', err); }

    try {
      const data = await apiFetch('/api/projects');
      const projects = normalizeProjectsResponse(data);
      const container = qs('#recent-projects');
      if (!container) return;
      container.innerHTML = '';
      projects.slice(0,6).forEach(p => {
        const a = document.createElement('a');
        a.className = 'list-group-item list-group-item-action bg-dark text-light';
        a.href = p.link || `/p/${p.slug}/`;
        a.target = '_blank';
        a.innerHTML = `<strong>${escapeHtml(p.title)}</strong><div class="small text-muted">${new Date(p.createdAt).toLocaleString()}</div>`;
        container.appendChild(a);
      });
      if (projects.length === 0) container.innerHTML = '<div class="text-muted">No projects yet.</div>';
    } catch (err) { console.error('Recent projects error', err); }
  }

  // ---------- Projects ----------
  function normalizeProjectsResponse(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.projects && Array.isArray(data.projects)) return data.projects;
    return [];
  }

  function initProjects() {
    loadProjectsList();

    const form = qs('#upload-form');
    const fb = qs('#uploadFeedback') || document.createElement('div');
    if (!fb.id) fb.id = 'uploadFeedback';
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        showMessage(fb, 'Uploading...', 'info');
        const fd = new FormData(form);
        const storeLink = qs('#storeLink')?.value.trim();
        if (storeLink) fd.append('storeLink', storeLink);

        try {
          const res = await fetch('/api/projects/upload', {
            method: 'POST',
            headers: { 'x-auth': getToken() },
            body: fd
          });
          const data = await res.json();
          if (!res.ok) {
            showMessage(fb, data.error || 'Upload failed', 'error');
            return;
          }
          showMessage(fb, 'Uploaded successfully', 'success');
          form.reset();
          loadProjectsList();
        } catch (err) {
          showMessage(fb, err.message || 'Network error', 'error');
        }
      });
    }
  }

  async function loadProjectsList() {
    try {
      const data = await apiFetch('/api/projects');
      const projects = normalizeProjectsResponse(data);
      const listContainer = qs('#projects-list') || qs('#projectsTbody');
      if (!listContainer) return;

      listContainer.innerHTML = '';
      projects.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
          <div class="card h-100">
            ${p.thumbnail ? `<img src="${p.thumbnail}" class="card-img-top" alt="thumb">` : ''}
            <div class="card-body">
              <h5 class="card-title">${escapeHtml(p.title)}</h5>
              <p class="card-text">${escapeHtml(p.description || '')}</p>
              <div class="d-flex gap-2">
                <a class="btn btn-sm btn-outline-primary"
                  href="${p.link}" target="_blank"><i class="bi bi-box-arrow-up-right"></i></a>
                ${(p.buyLink || p.storeLink) ? `<a class="btn btn-sm btn-success"
                  href="${p.buyLink || p.storeLink}" target="_blank"><i class="bi bi-cart"></i> Buy</a>` : ''}
                <button class="btn btn-sm btn-danger btn-delete" data-id="${p.id}"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>`;
        listContainer.appendChild(col);
      });

      qsa('.btn-delete').forEach(btn => {
        btn.removeEventListener('click', handleProjectDelete);
        btn.addEventListener('click', handleProjectDelete);
      });
    } catch (err) { console.error('Load projects error', err); }
  }

  async function handleProjectDelete(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    if (!confirm('Delete this project?')) return;
    try {
      await apiFetch(`/api/projects/${id}`, { method: 'DELETE' });
      await loadProjectsList();
    } catch (err) { alert(err.message || 'Delete failed'); }
  }

  // ---------- Subscribers ----------
  async function initSubscribers() { await loadSubscribers(); }
  async function loadSubscribers() {
    try {
      const subs = await apiFetch('/api/subscribers');
      const listUl = qs('#subscribers-list') || qs('#subsTbody');
      if (!listUl) return;
      listUl.innerHTML = '';
      (subs || []).forEach(s => {
        const li = document.createElement('li');
        li.className = 'list-group-item bg-dark text-light d-flex justify-content-between align-items-center';
        li.innerHTML = `<div><i class="bi bi-envelope"></i> ${escapeHtml(s.email)}</div>
          <div><small class="text-muted">${new Date(s.createdAt).toLocaleString()}</small>
          <button data-email="${encodeURIComponent(s.email)}" class="btn btn-sm btn-danger btn-del-sub ms-2"><i class="bi bi-trash"></i></button></div>`;
        listUl.appendChild(li);
      });
      qsa('.btn-del-sub').forEach(btn => {
        btn.removeEventListener('click', handleDelSubscriber);
        btn.addEventListener('click', handleDelSubscriber);
      });
    } catch (err) { console.error('Load subscribers error', err); }
  }
  async function handleDelSubscriber(e) {
    const emailEnc = e.currentTarget.dataset.email;
    if (!confirm('Delete subscriber?')) return;
    try {
      await apiFetch(`/api/subscribers/${emailEnc}`, { method: 'DELETE' });
      await loadSubscribers();
    } catch (err) { alert(err.message || 'Delete failed'); }
  }

  // ---------- Socials ----------
  function initSocials() {
    const form = qs('#socials-form');
    if (!form) return;
    const fb = document.createElement('div'); fb.id = 'socialsFeedback'; form.prepend(fb);

    apiFetch('/api/socials', { method: 'GET' })
      .then(data => {
        if (!data) return;
        form.querySelector('#github') && (form.querySelector('#github').value = data.github || '');
        form.querySelector('#telegram') && (form.querySelector('#telegram').value = data.telegram || '');
        form.querySelector('#facebook') && (form.querySelector('#facebook').value = data.facebook || '');
        form.querySelector('#instagram') && (form.querySelector('#instagram').value = data.instagram || '');
      });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        github: form.querySelector('#github').value.trim(),
        telegram: form.querySelector('#telegram').value.trim(),
        facebook: form.querySelector('#facebook').value.trim(),
        instagram: form.querySelector('#instagram').value.trim()
      };
      showMessage(fb, 'Saving...', 'info');
      try {
        await apiFetch('/api/socials', { method: 'POST', body: payload });
        showMessage(fb, 'Saved', 'success');
      } catch (err) {
        showMessage(fb, err.message || 'Save failed', 'error');
      }
    });
  }

  // ---------- Settings ----------
  function initSettings() {
    const settingsForm = qs('#settings-form');
    const passwordForm = qs('#password-form');
    const fbSettings = document.createElement('div'); fbSettings.id = 'settingsFeedback'; if (settingsForm) settingsForm.prepend(fbSettings);
    const fbPass = document.createElement('div'); fbPass.id = 'passwordFeedback'; if (passwordForm) passwordForm.prepend(fbPass);

    apiFetch('/api/settings', { method: 'GET' }).then(data => {
      if (!data) return;
      if (settingsForm) {
        settingsForm.querySelector('#siteTitle') && (settingsForm.querySelector('#siteTitle').value = data.title || '');
        settingsForm.querySelector('#siteDescription') && (settingsForm.querySelector('#siteDescription').value = data.description || '');
      }
    });

    if (settingsForm) {
      settingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          title: settingsForm.querySelector('#siteTitle').value.trim(),
          description: settingsForm.querySelector('#siteDescription').value.trim()
        };
        showMessage(fbSettings, 'Saving...', 'info');
        try {
          await apiFetch('/api/settings', { method: 'POST', body: payload });
          showMessage(fbSettings, 'Saved', 'success');
        } catch (err) { showMessage(fbSettings, err.message || 'Save failed', 'error'); }
      });
    }

    if (passwordForm) {
      passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const current = passwordForm.querySelector('#currentPassword').value;
        const next = passwordForm.querySelector('#newPassword').value;
        const confirm = passwordForm.querySelector('#confirmPassword').value;
        if (next !== confirm) {
          showMessage(fbPass, 'New password and confirmation do not match', 'error');
          return;
        }
        showMessage(fbPass, 'Updating password...', 'info');
        try {
          await apiFetch('/api/change-password', { method: 'POST', body: { oldPassword: current, newPassword: next } });
          showMessage(fbPass, 'Password updated', 'success');
          passwordForm.reset();
        } catch (err) { showMessage(fbPass, err.message || 'Password update failed', 'error'); }
      });
    }
  }

  // ---------- Stats ----------
  async function initStats() {
    try {
      const projectsResp = await apiFetch('/api/projects');
      const subscribersResp = await apiFetch('/api/subscribers');
      const projects = normalizeProjectsResponse(projectsResp);
      const subscribers = Array.isArray(subscribersResp) ? subscribersResp : (subscribersResp.subscribers || []);

      const projectSeries = aggregateByMonth(projects.map(p => p.createdAt));
      const subsSeries = aggregateByMonth(subscribers.map(s => s.createdAt));

      const labels = unionSortedKeys(projectSeries, subsSeries);
      const projData = labels.map(l => projectSeries[l] || 0);
      const subData = labels.map(l => subsSeries[l] || 0);

      const projCanvas = qs('#projectsChart');
      const subsCanvas = qs('#subscribersChart');
      if (projCanvas) renderLineChart(projCanvas, labels, projData, 'Projects');
      if (subsCanvas) renderLineChart(subsCanvas, labels, subData, 'Subscribers');
    } catch (err) { console.error('Stats error', err); }
  }

  function aggregateByMonth(dates) {
    const map = {};
    (dates || []).forEach(d => {
      const dt = new Date(d);
      const key = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }
  function unionSortedKeys(...maps) {
    const set = new Set();
    maps.forEach(m => Object.keys(m).forEach(k => set.add(k)));
    return Array.from(set).sort();
  }
  function renderLineChart(canvas, labels, data, label) {
    if (!window.Chart) return;
    new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{ label, data, borderColor: 'rgba(75,192,192,1)', tension:0.1 }]
      },
      options: { responsive: true, plugins: { legend: { display: true } } }
    });
  }
})();
