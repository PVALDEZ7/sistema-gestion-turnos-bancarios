const usuarioActual = localStorage.getItem("usuarioActual")

const totalTurnosReporte = document.getElementById("totalTurnosReporte")
const atendidosReporte = document.getElementById("atendidosReporte")
const pendientesReporte = document.getElementById("pendientesReporte")
const canceladosReporte = document.getElementById("canceladosReporte")

const porcentajeAtendidos = document.getElementById("porcentajeAtendidos")
const porcentajePendientes = document.getElementById("porcentajePendientes")
const porcentajeCancelados = document.getElementById("porcentajeCancelados")

const barraAtendidos = document.getElementById("barraAtendidos")
const barraPendientes = document.getElementById("barraPendientes")
const barraCancelados = document.getElementById("barraCancelados")

const reporteServicios = document.getElementById("reporteServicios")
const tablaReporteServicios = document.getElementById(
  "tablaReporteServicios"
)

const fechaReporte = document.getElementById("fechaReporte")
const imprimirReporte = document.getElementById("imprimirReporte")
const cerrarSesion = document.getElementById("cerrarSesion")

if (!usuarioActual) {
  window.location.href = "index.html"
}

function obtenerTurnos() {
  return JSON.parse(localStorage.getItem("turnos")) || []
}

function calcularPorcentaje(cantidad, total) {
  if (total === 0) {
    return 0
  }

  return Math.round((cantidad / total) * 100)
}

function cargarReportes() {
  const turnos = obtenerTurnos()

  const atendidos = turnos.filter(function (turno) {
    return turno.estado === "Atendido"
  })

  const pendientes = turnos.filter(function (turno) {
    return (
      turno.estado === "Pendiente" ||
      turno.estado === "En atención"
    )
  })

  const cancelados = turnos.filter(function (turno) {
    return turno.estado === "Cancelado"
  })

  const total = turnos.length

  const porcentajeAtendidosValor = calcularPorcentaje(
    atendidos.length,
    total
  )

  const porcentajePendientesValor = calcularPorcentaje(
    pendientes.length,
    total
  )

  const porcentajeCanceladosValor = calcularPorcentaje(
    cancelados.length,
    total
  )

  totalTurnosReporte.textContent = total
  atendidosReporte.textContent = atendidos.length
  pendientesReporte.textContent = pendientes.length
  canceladosReporte.textContent = cancelados.length

  porcentajeAtendidos.textContent =
    porcentajeAtendidosValor + "%"

  porcentajePendientes.textContent =
    porcentajePendientesValor + "%"

  porcentajeCancelados.textContent =
    porcentajeCanceladosValor + "%"

  barraAtendidos.style.width =
    porcentajeAtendidosValor + "%"

  barraPendientes.style.width =
    porcentajePendientesValor + "%"

  barraCancelados.style.width =
    porcentajeCanceladosValor + "%"

  mostrarReporteServicios(turnos)

  fechaReporte.textContent =
    new Date().toLocaleDateString("es-PE")
}

function mostrarReporteServicios(turnos) {
  const servicios = [
    "Consultas",
    "Depósitos",
    "Retiros",
    "Pago de servicios",
    "Atención al cliente"
  ]

  reporteServicios.innerHTML = ""
  tablaReporteServicios.innerHTML = ""

  if (turnos.length === 0) {
    reporteServicios.innerHTML = `
      <p class="sin-turnos">
        No existen datos registrados
      </p>
    `

    tablaReporteServicios.innerHTML = `
      <tr>
        <td colspan="3">
          No existen datos registrados
        </td>
      </tr>
    `

    return
  }

  servicios.forEach(function (servicio) {
    const cantidad = turnos.filter(function (turno) {
      return turno.servicio === servicio
    }).length

    const porcentaje = calcularPorcentaje(
      cantidad,
      turnos.length
    )

    const elemento = document.createElement("div")
    elemento.className = "servicio-reporte"

    elemento.innerHTML = `
      <div class="servicio-reporte-info">
        <span>${servicio}</span>
        <strong>${cantidad}</strong>
      </div>

      <div class="servicio-barra-fondo">
        <div
          class="servicio-barra"
          style="width: ${porcentaje}%">
        </div>
      </div>
    `

    reporteServicios.appendChild(elemento)

    const fila = document.createElement("tr")

    fila.innerHTML = `
      <td>${servicio}</td>
      <td>${cantidad}</td>
      <td>${porcentaje}%</td>
    `

    tablaReporteServicios.appendChild(fila)
  })
}

imprimirReporte.addEventListener("click", function () {
  window.print()
})

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActual")
  window.location.href = "index.html"
})

cargarReportes()
