document.addEventListener("DOMContentLoaded", () => {
  // Load general data
  fetch("/api/data")
    .then(res => res.json())
    .then(data => {
      renderProjects(data.projects);
      renderSocials(data.socials);
    })
    .catch(err => console.error("Error fetching data:", err));

  // Subscribe form
  const subscribeForm = document.getElementById("subscribe-form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("subscribe-email").value;
      fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      .then(res => res.json())
      .then(result => {
        alert(result.error ? result.error : "Subscribed successfully!");
        subscribeForm.reset();
      })
      .catch(err => console.error("Subscribe error:", err));
    });
  }
});

// 🔹 Render projects
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  if (!projects || projects.length === 0) {
    container.innerHTML = `<p class="text-center text-muted">No projects available yet.</p>`;
    return;
  }

  projects.forEach(project => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card project-card h-100 shadow-sm">
        ${project.thumbnail ? `<img src="${project.thumbnail}" class="card-img-top" alt="${project.title}">` : ""}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <div class="mt-auto d-grid gap-2">
            <a href="${project.link}" target="_blank" class="btn btn-primary">
              <i class="bi bi-box-arrow-up-right"></i> Open
            </a>
            ${project.storeLink ? `
              <a href="${project.storeLink}" target="_blank" class="btn btn-success">
                <i class="bi bi-cart-check"></i> Buy Now
              </a>
            ` : ""}
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// 🔹 Render socials
function renderSocials(socials) {
  const container = document.getElementById("socials-container");
  if (!container) return;

  container.innerHTML = "";

  const allowed = {
    github: "bi-github",
    telegram: "bi-telegram",
    facebook: "bi-facebook",
    instagram: "bi-instagram"
  };

  for (const [key, icon] of Object.entries(allowed)) {
    if (socials[key]) {
      const a = document.createElement("a");
      a.href = socials[key];
      a.target = "_blank";
      a.innerHTML = `<i class="bi ${icon} fs-3"></i>`;
      container.appendChild(a);
    }
  }
}
