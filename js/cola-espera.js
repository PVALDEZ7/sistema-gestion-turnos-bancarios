const usuarioActual = localStorage.getItem("usuarioActual")
const tablaTurnos = document.getElementById("tablaTurnos")
const listaSiguientes = document.getElementById("listaSiguientes")
const cantidadPendientes = document.getElementById("cantidadPendientes")
const turnoActual = document.getElementById("turnoActual")
const servicioActual = document.getElementById("servicioActual")
const moduloActual = document.getElementById("moduloActual")
const cerrarSesion = document.getElementById("cerrarSesion")

if (!usuarioActual) {
  window.location.href = "index.html"
}

function cargarColaEspera() {
  const turnos = JSON.parse(localStorage.getItem("turnos")) || []

  const pendientes = turnos.filter(function (turno) {
    return turno.estado === "Pendiente"
  })

  const enAtencion = turnos.find(function (turno) {
    return turno.estado === "En atención"
  })

  mostrarTurnoActual(enAtencion)
  mostrarSiguientesTurnos(pendientes)
  mostrarTablaPendientes(pendientes)

  cantidadPendientes.textContent =
    pendientes.length + (pendientes.length === 1 ? " turno" : " turnos")
}

function mostrarTurnoActual(turno) {
  if (!turno) {
    turnoActual.textContent = "Ninguno"
    servicioActual.textContent = "No hay turnos en atención"
    moduloActual.textContent = "Módulo sin asignar"
    return
  }

  turnoActual.textContent = turno.numero
  servicioActual.textContent = turno.servicio
  moduloActual.textContent = turno.modulo || "Módulo 1"
}

function mostrarSiguientesTurnos(turnos) {
  listaSiguientes.innerHTML = ""

  if (turnos.length === 0) {
    listaSiguientes.innerHTML = `
      <p class="sin-turnos">
        No hay turnos pendientes
      </p>
    `
    return
  }

  const primerosTurnos = turnos.slice(0, 5)

  primerosTurnos.forEach(function (turno) {
    const elemento = document.createElement("div")
    elemento.className = "turno-siguiente"

    elemento.innerHTML = `
      <strong>${turno.numero}</strong>
      <span>${turno.servicio}</span>
    `

    listaSiguientes.appendChild(elemento)
  })
}

function mostrarTablaPendientes(turnos) {
  tablaTurnos.innerHTML = ""

  if (turnos.length === 0) {
    tablaTurnos.innerHTML = `
      <tr>
        <td colspan="4">
          No existen turnos pendientes
        </td>
      </tr>
    `
    return
  }

  turnos.forEach(function (turno) {
    const fila = document.createElement("tr")

    fila.innerHTML = `
      <td>${turno.numero}</td>
      <td>${turno.servicio}</td>
      <td>${turno.hora}</td>
      <td>
        <span class="estado-pendiente">
          ${turno.estado}
        </span>
      </td>
    `

    tablaTurnos.appendChild(fila)
  })
}

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActual")
  window.location.href = "index.html"
})

cargarColaEspera()
