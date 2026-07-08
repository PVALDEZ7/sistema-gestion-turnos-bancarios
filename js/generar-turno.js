const usuarioActual = localStorage.getItem("usuarioActual")
const formularioTurno = document.getElementById("turnoForm")
const tipoAtencion = document.getElementById("tipoAtencion")
const numeroTurno = document.getElementById("numeroTurno")
const servicioTurno = document.getElementById("servicioTurno")
const cerrarSesion = document.getElementById("cerrarSesion")

if (!usuarioActual) {
  window.location.href = "index.html"
}

formularioTurno.addEventListener("submit", function (evento) {
  evento.preventDefault()

  const servicioSeleccionado = tipoAtencion.value

  if (servicioSeleccionado === "") {
    alert("Seleccione un tipo de atención")
    return
  }

  let contador = Number(localStorage.getItem("contadorTurnos")) || 0
  contador = contador + 1

  localStorage.setItem("contadorTurnos", contador)

  const turnoGenerado = "B-" + String(contador).padStart(3, "0")

  const fechaActual = new Date()

  const nuevoTurno = {
    id: Date.now(),
    numero: turnoGenerado,
    servicio: servicioSeleccionado,
    estado: "Pendiente",
    fecha: fechaActual.toLocaleDateString("es-PE"),
    hora: fechaActual.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const turnosGuardados =
    JSON.parse(localStorage.getItem("turnos")) || []

  turnosGuardados.push(nuevoTurno)

  localStorage.setItem(
    "turnos",
    JSON.stringify(turnosGuardados)
  )

  numeroTurno.textContent = turnoGenerado
  servicioTurno.textContent = servicioSeleccionado

  formularioTurno.reset()
})

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActual")
  window.location.href = "index.html"
})
