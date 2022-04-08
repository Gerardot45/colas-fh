const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    //TODO - notificar que hay un nuevo ticket pendiente por asignar

    
  });
};

module.exports = {
  socketController,
};
