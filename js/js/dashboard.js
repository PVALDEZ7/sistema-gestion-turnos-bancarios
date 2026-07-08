const usuarioActual = localStorage.getItem("usuarioActual");
const nombreUsuario = document.getElementById("nombreUsuario");
const cerrarSesion = document.getElementById("cerrarSesion");

if (!usuarioActual) {
  window.location.href = "index.html";
} else {
  nombreUsuario.textContent = usuarioActual;
}

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActual");
  window.location.href = "index.html";
});
