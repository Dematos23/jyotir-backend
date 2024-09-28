const { Office, ReservationState } = require("@prisma/client");
const { format } = require("date-fns");

class ReservationsDto {
  static post({
    name,
    startTime,
    endTime,
    implementos,
    observation,
    office,
    currentUserId,
    users,
    clients,
  }) {
    if (!name || !startTime || !endTime) {
      throw Error("Faltan datos para crear la reserva");
    }

    users.push(currentUserId);

    return {
      name,
      startTime,
      endTime,
      implementos,
      observation,
      office,
      state: "EVALUACION",
      users,
      clients,
    };
  }

  static get({ currentUserId, currentUserRole }) {
    return { currentUserId, currentUserRole };
  }

  static put({ id, ambienteAsignado, estado }) {
    if (!{ id, ambienteAsignado, estado }) {
      throw Error("No se ha pasado un body al Dto");
    }

    if (typeof id !== "number") {
      throw Error("No se ha enviado un id válido");
    }

    const ambientes = [
      "SALON_PRINCIPAL",
      "SALON_ESPEJO",
      "SALA_1",
      "CONSULTORIO_1",
      "CONSULTORIO_2",
    ];

    const ambienteValido = ambientes.includes(ambienteAsignado);

    if (!ambienteValido) {
      throw Error("No se ha enviado un ambiente válido");
    }

    const estados = ["PENDIENTE", "APROBADO", "RECHAZADO"];

    const estadoValido = estados.includes(estado);
    if (!estadoValido) {
      throw Error("No se ha enviado un estado válido");
    }

    return [{ id }, { ambienteAsignado, estado }];
  }
  static putEval({ id, state, office, observation }) {
    switch (state) {
      case "Aprobado":
        state = "APROBADO";
        break;
      case "Evaluación":
        state = "EVALUACION";
        break;
      case "Observación":
        state = "OBSERVACION";
        break;
      case "Rechazado":
        state = "RECHAZADO";
        break;
    }

    switch (office) {
      case "Salón principal":
        office = "SALON_PRINCIPAL";
        break;
      case "Salón espejo":
        office = "SALON_ESPEJO";
        break;
      case "Sala 1":
        office = "SALA_1";
        break;
      case "Consultorio 1":
        office = "CONSULTORIO_1";
        break;
      case "Consultorio 2":
        office = "CONSULTORIO_2";
        break;
    }

    const validStates = ["APROBADO", "EVALUACION", "OBSERVACION", "RECHAZADO"];
    if (!validStates.includes(state)) {
      throw new Error("El estado de la reserva no es válido");
    }
    const validOffices = [
      "SALON_PRINCIPAL",
      "SALON_ESPEJO",
      "SALA_1",
      "CONSULTORIO_1",
      "CONSULTORIO_2",
    ];
    if (!validOffices.includes(office)) {
      throw new Error("El espacio de la reserva no es válido");
    }

    return { id, state, office, observation };
  }

  static format(reservations) {
    const formmattedReservations = reservations.map((reservation) => {
      const startTime = new Date(reservation.startTime);
      const endTime = new Date(reservation.endTime);

      let officeFormatted;

      switch (reservation.office) {
        case Office.SALON_PRINCIPAL:
          officeFormatted = "Salón principal";
          break;
        case Office.SALON_ESPEJO:
          officeFormatted = "Salón espejo";
          break;
        case Office.SALA_1:
          officeFormatted = "Sala 1";
          break;
        case Office.CONSULTORIO_1:
          officeFormatted = "Consultorio 1";
          break;
        case Office.CONSULTORIO_2:
          officeFormatted = "Consultorio 2";
          break;
        default:
          officeFormatted = "Espacio no especificado"; // Valor por defecto en caso de que no haya coincidencia
      }

      let stateFormatted;

      switch (reservation.state) {
        case ReservationState.APROBADO:
          stateFormatted = "Aprobado";
          break;
        case ReservationState.EVALUACION:
          stateFormatted = "Evaluación";
          break;
        case ReservationState.OBSERVACION:
          stateFormatted = "Observación";
          break;
        case ReservationState.RECHAZADO:
          stateFormatted = "Rechazado";
          break;
        default:
          stateFormatted = "Estado no especificado";
      }

      return {
        ...reservation,
        date: format(startTime, "dd/MM/yyyy"),
        startTime: format(startTime, "hh:mm aa"),
        endTime: format(endTime, "hh:mm aa"),
        office: officeFormatted,
        state: stateFormatted,
      };
    });
    return formmattedReservations;
  }
}

module.exports = ReservationsDto;
