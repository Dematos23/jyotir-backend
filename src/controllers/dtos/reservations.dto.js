const findReservation = require("../../utils/findReservation");

class ReservationsDto {
  static post({
    name,
    startTime,
    endTime,
    implementos,
    office,
    currentUserId,
    userIds,
    clientIds,
  }) {
    if (!name || !startTime || !endTime) {
      throw Error("Faltan datos para crear la reserva");
    }

    userIds.push(currentUserId);

    return {
      name,
      startTime,
      endTime,
      implementos,
      office,
      state: "EVALUACION",
      userIds,
      clientIds,
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
  static putEval({ reservationId, state, office, observation }) {
    const validStates = ["APROBADO", "OBSERVACION", "RECHAZADO"];
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
    return { reservationId, state, office, observation };
  }
}

module.exports = ReservationsDto;
