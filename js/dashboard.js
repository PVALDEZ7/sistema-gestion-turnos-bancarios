const usuarioActual = localStorage.getItem("usuarioActual")
const nombreUsuario = document.getElementById("nombreUsuario")
const cerrarSesion = document.getElementById("cerrarSesion")

const turnosAtendidos = document.getElementById("turnosAtendidos")
const turnosPendientes = document.getElementById("turnosPendientes")
const clientesEspera = document.getElementById("clientesEspera")

if (!usuarioActual) {
  window.location.href = "index.html"
} else {
  nombreUsuario.textContent = usuarioActual
}

function cargarEstadisticas() {
  const turnos = JSON.parse(localStorage.getItem("turnos")) || []

  const atendidos = turnos.filter(function (turno) {
    return turno.estado === "Atendido"
  })

  const pendientes = turnos.filter(function (turno) {
    return turno.estado === "Pendiente"
  })

  const enAtencion = turnos.filter(function (turno) {
    return turno.estado === "En atención"
  })

  turnosAtendidos.textContent = atendidos.length
  turnosPendientes.textContent = pendientes.length
  clientesEspera.textContent = pendientes.length + enAtencion.length
}

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActual")
  window.location.href = "index.html"
})

cargarEstadisticas()
