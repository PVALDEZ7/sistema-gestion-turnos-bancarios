const formulario = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  if (usuario === "admin" && contrasena === "1234") {
    mensaje.textContent = "Inicio de sesión correcto";
    mensaje.style.color = "green";

    localStorage.setItem("usuarioActual", usuario);

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos";
    mensaje.style.color = "red";
  }
});
/* =========================
   PANEL PRINCIPAL
========================= */

.dashboard-body {
  display: block;
  padding: 0;
  background: #f1f5f9;
}

.dashboard-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
}

.sidebar {
  background: #0b2867;
  color: white;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  padding: 0 10px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.sidebar-logo h2 {
  font-size: 24px;
  margin-bottom: 6px;
}

.sidebar-logo p {
  font-size: 14px;
  color: #cbd5e1;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
}

.sidebar-menu a {
  color: #e2e8f0;
  text-decoration: none;
  padding: 14px 16px;
  border-radius: 8px;
  transition: 0.2s;
}

.sidebar-menu a:hover,
.sidebar-menu a.active {
  background: #2563eb;
  color: white;
}

.logout-button {
  margin-top: auto;
  background: transparent;
  border: 1px solid #cbd5e1;
}

.logout-button:hover {
  background: #dc2626;
  border-color: #dc2626;
}

.dashboard-main {
  padding: 40px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}

.dashboard-header h1 {
  color: #0f172a;
  font-size: 32px;
  margin-bottom: 8px;
}

.dashboard-header p {
  color: #64748b;
}

.user-info {
  background: white;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.08);
}

.statistics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
  border-left: 5px solid #2563eb;
}

.stat-card h3 {
  color: #475569;
  font-size: 16px;
  margin-bottom: 15px;
}

.stat-card p {
  color: #0b2867;
  font-size: 36px;
  font-weight: bold;
}

.quick-access h2 {
  color: #0f172a;
  margin-bottom: 20px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.quick-card {
  background: white;
  padding: 28px;
  border-radius: 14px;
  text-decoration: none;
  color: #0f172a;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
  transition: 0.2s;
}

.quick-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
}

.quick-card h3 {
  color: #1d4ed8;
  margin-bottom: 10px;
}

.quick-card p {
  color: #64748b;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    min-height: auto;
  }

  .statistics,
  .quick-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
}
