const usuarioActual = localStorage.getItem("usuarioActual")

const buscarTurno = document.getElementById("buscarTurno")
const filtroEstado = document.getElementById("filtroEstado")
const filtroServicio = document.getElementById("filtroServicio")
const limpiarFiltros = document.getElementById("limpiarFiltros")

const tablaHistorial = document.getElementById("tablaHistorial")
const cantidadHistorial = document.getElementById("cantidadHistorial")
const cerrarSesion = document.getElementById("cerrarSesion")

if (!usuarioActual) {
  window.location.href = "index.html"
}

function obtenerTurnos() {
  return JSON.parse(localStorage.getItem("turnos")) || []
}

function mostrarHistorial(turnos) {
  tablaHistorial.innerHTML = ""

  cantidadHistorial.textContent =
    turnos.length +
    (turnos.length === 1 ? " registro" : " registros")

  if (turnos.length === 0) {
    tablaHistorial.innerHTML = `
      <tr>
        <td colspan="6">
          No existen turnos registrados
        </td>
      </tr>
    `
    return
  }

  turnos
    .slice()
    .reverse()
    .forEach(function (turno) {
      const fila = document.createElement("tr")

      let claseEstado = "estado-pendiente"

      if (turno.estado === "Atendido") {
        claseEstado = "estado-atendido"
      }

      if (turno.estado === "Cancelado") {
        claseEstado = "estado-cancelado"
      }

      if (turno.estado === "En atención") {
        claseEstado = "estado-atencion"
      }

      fila.innerHTML = `
        <td>${turno.numero}</td>
        <td>${turno.servicio}</td>
        <td>${turno.fecha}</td>
        <td>${turno.hora}</td>
        <td>${turno.asesor || "Sin asignar"}</td>
        <td>
          <span class="${claseEstado}">
            ${turno.estado}
          </span>
        </td>
      `

      tablaHistorial.appendChild(fila)
    })
}

function aplicarFiltros() {
  const textoBusqueda = buscarTurno.value.trim().toLowerCase()
  const estadoSeleccionado = filtroEstado.value
  const servicioSeleccionado = filtroServicio.value

  const turnos = obtenerTurnos()

  const turnosFiltrados = turnos.filter(function (turno) {
    const coincideNumero =
      turno.numero.toLowerCase().includes(textoBusqueda)

    const coincideEstado =
      estadoSeleccionado === "" ||
      turno.estado === estadoSeleccionado

    const coincideServicio =
      servicioSeleccionado === "" ||
      turno.servicio === servicioSeleccionado

    return coincideNumero && coincideEstado && coincideServicio
  })

  mostrarHistorial(turnosFiltrados)
}

buscarTurno.addEventListener("input", aplicarFiltros)
filtroEstado.addEventListener("change", aplicarFiltros)
filtroServicio.addEventListener("change", aplicarFiltros)

limpiarFiltros.addEventListener("click", function () {
  buscarTurno.value = ""
  filtroEstado.value = ""
  filtroServicio.value = ""

  mostrarHistorial(obtenerTurnos())
})

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActual")
  window.location.href = "index.html"
})

mostrarHistorial(obtenerTurnos())
