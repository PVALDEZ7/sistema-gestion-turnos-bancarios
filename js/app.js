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
