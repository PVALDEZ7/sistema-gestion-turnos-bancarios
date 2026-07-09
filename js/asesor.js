const usuarioActual = localStorage.getItem("usuarioActual")

const turnoEnAtencion = document.getElementById("turnoEnAtencion")
const servicioEnAtencion = document.getElementById("servicioEnAtencion")
const horaEnAtencion = document.getElementById("horaEnAtencion")

const llamarSiguiente = document.getElementById("llamarSiguiente")
const finalizarAtencion = document.getElementById("finalizarAtencion")
const cancelarTurno = document.getElementById("cancelarTurno")

const totalPendientes = document.getElementById("totalPendientes")
const totalAtendidos = document.getElementById("totalAtendidos")
const totalCancelados = document.getElementById("totalCancelados")

const cantidadPendientesAsesor = document.getElementById(
  "cantidadPendientesAsesor"
)

const tablaPendientesAsesor = document.getElementById(
  "tablaPendientesAsesor"
)

const tablaAtendidosAsesor = document.getElementById(
  "tablaAtendidosAsesor"
)

const cerrarSesion = document.getElementById("cerrarSesion")

if (!usuarioActual) {
  window.location.href = "index.html"
}

function obtenerTurnos() {
  return JSON.parse(localStorage.getItem("turnos")) || []
}

function guardarTurnos(turnos) {
  localStorage.setItem("turnos", JSON.stringify(turnos))
}

function cargarPanelAsesor() {
  const turnos = obtenerTurnos()

  const pendientes = turnos.filter(function (turno) {
    return turno.estado === "Pendiente"
  })

  const atendidos = turnos.filter(function (turno) {
    return turno.estado === "Atendido"
  })

  const cancelados = turnos.filter(function (turno) {
    return turno.estado === "Cancelado"
  })

  const turnoActivo = turnos.find(function (turno) {
    return turno.estado === "En atención"
  })

  mostrarTurnoActivo(turnoActivo)
  mostrarResumen(pendientes, atendidos, cancelados)
  mostrarPendientes(pendientes)
  mostrarAtendidos(atendidos)
}

function mostrarTurnoActivo(turno) {
  if (!turno) {
    turnoEnAtencion.textContent = "Ninguno"
    servicioEnAtencion.textContent = "No existe un turno activo"
    horaEnAtencion.textContent = "Sin hora registrada"

    finalizarAtencion.disabled = true
    cancelarTurno.disabled = true
    llamarSiguiente.disabled = false

    return
  }

  turnoEnAtencion.textContent = turno.numero
  servicioEnAtencion.textContent = turno.servicio
  horaEnAtencion.textContent =
    "Llamado a las " + (turno.horaLlamado || turno.hora)

  finalizarAtencion.disabled = false
  cancelarTurno.disabled = false
  llamarSiguiente.disabled = true
}

function mostrarResumen(pendientes, atendidos, cancelados) {
  totalPendientes.textContent = pendientes.length
  totalAtendidos.textContent = atendidos.length
  totalCancelados.textContent = cancelados.length

  cantidadPendientesAsesor.textContent =
    pendientes.length +
    (pendientes.length === 1 ? " turno" : " turnos")
}

function mostrarPendientes(turnos) {
  tablaPendientesAsesor.innerHTML = ""

  if (turnos.length === 0) {
    tablaPendientesAsesor.innerHTML = `
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

    tablaPendientesAsesor.appendChild(fila)
  })
}

function mostrarAtendidos(turnos) {
  tablaAtendidosAsesor.innerHTML = ""

  if (turnos.length === 0) {
    tablaAtendidosAsesor.innerHTML = `
      <tr>
        <td colspan="4">
          No existen turnos atendidos
        </td>
      </tr>
    `
    return
  }

  const ultimosAtendidos = turnos.slice(-5).reverse()

  ultimosAtendidos.forEach(function (turno) {
    const fila = document.createElement("tr")

    fila.innerHTML = `
      <td>${turno.numero}</td>
      <td>${turno.servicio}</td>
      <td>${turno.horaFinalizacion || turno.hora}</td>
      <td>
        <span class="estado-atendido">
          ${turno.estado}
        </span>
      </td>
    `

    tablaAtendidosAsesor.appendChild(fila)
  })
}

llamarSiguiente.addEventListener("click", function () {
  const turnos = obtenerTurnos()

  const existeTurnoActivo = turnos.some(function (turno) {
    return turno.estado === "En atención"
  })

  if (existeTurnoActivo) {
    alert("Primero debe finalizar o cancelar el turno actual")
    return
  }

  const siguienteTurno = turnos.find(function (turno) {
    return turno.estado === "Pendiente"
  })

  if (!siguienteTurno) {
    alert("No existen turnos pendientes")
    return
  }

  siguienteTurno.estado = "En atención"
  siguienteTurno.asesor = usuarioActual
  siguienteTurno.modulo = "Módulo 1"
  siguienteTurno.horaLlamado = new Date().toLocaleTimeString(
    "es-PE",
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  )

  guardarTurnos(turnos)
  cargarPanelAsesor()
})

finalizarAtencion.addEventListener("click", function () {
  const turnos = obtenerTurnos()

  const turnoActivo = turnos.find(function (turno) {
    return turno.estado === "En atención"
  })

  if (!turnoActivo) {
    alert("No existe un turno en atención")
    return
  }

  turnoActivo.estado = "Atendido"
  turnoActivo.horaFinalizacion =
    new Date().toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit"
    })

  guardarTurnos(turnos)
  cargarPanelAsesor()

  alert("La atención fue finalizada correctamente")
})

cancelarTurno.addEventListener("click", function () {
  const turnos = obtenerTurnos()

  const turnoActivo = turnos.find(function (turno) {
    return turno.estado === "En atención"
  })

  if (!turnoActivo) {
    alert("No existe un turno para cancelar")
    return
  }

  const confirmar = confirm(
    "¿Está seguro de cancelar el turno " +
      turnoActivo.numero +
      "?"
  )

  if (!confirmar) {
    return
  }

  turnoActivo.estado = "Cancelado"
  turnoActivo.horaFinalizacion =
    new Date().toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit"
    })

  guardarTurnos(turnos)
  cargarPanelAsesor()
})

cerrarSesion.addEventListener("click", function () {
  localStorage.removeItem("usuarioActual")
  window.location.href = "index.html"
})

cargarPanelAsesor()
