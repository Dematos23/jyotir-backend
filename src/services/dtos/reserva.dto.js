// const EstadosEnum = require("../../../prisma/schema.prisma").Estados;
// const estadosArray = Object.values(EstadosEnum );

class ReservaDto {
  static crear({
    userId,
    name,
    userMany,
    clienteMany,
    clientName,
    assistants,
    ambienteSolicitado,
    fecha,
    horaInicio,
    horaFin,
    implementos,
  }) {
    if (
      !{
        userId,
        name,
        userMany,
        clienteMany,
        clientName,
        assistants,
        ambienteSolicitado,
        fecha,
        horaInicio,
        horaFin,
        implementos,
      }
    ) {
      throw Error("No se ha pasado un body al Dto");
    }
    const [horaI, minutosI, segundosI] = horaInicio.split(":").map(Number);
    horaInicio = new Date();
    horaInicio.setHours(horaI);
    horaInicio.setMinutes(minutosI);
    horaInicio.setSeconds(segundosI);

    const [horaF, minutosF, segundosF] = horaFin.split(":").map(Number);
    horaFin = new Date();
    horaFin.setHours(horaF);
    horaFin.setMinutes(minutosF);
    horaFin.setSeconds(segundosF);

    return {
      userId,
      name,
      userMany,
      clienteMany,
      clientName,
      assistants,
      ambienteSolicitado,
      fecha,
      horaInicio,
      horaFin,
      implementos,
    };
  }
  static get({ userId }) {
    if (!{ userId }) {
      throw Error("No se ha pasado un body al Dto");
    }
    return { userId };
  }

  static delete({ id }) {
    if (!{ id }) {
      throw Error("No se ha pasado un body al Dto");
    }
    return { id };
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

    return [{ id}, {ambienteAsignado, estado }];
  }
}

module.exports = ReservaDto;
