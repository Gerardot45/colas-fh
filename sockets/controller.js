const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  // socket.on("disconnect", () => {
  //   console.log("Cliente desconectado", socket.id);
  // });
  socket.emit("ultimo-ticket", ticketControl.ultimo);
  socket.emit('estado-actual',ticketControl.ultimos4)

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    //TODO - notificar que hay un nuevo ticket pendiente por asignar
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "El escritorio es obligatorio",
      });
    }

    const ticket = ticketControl.antenderTicket(escritorio)
    socket.broadcast.emit('estado-actual', ticketControl.ultimos4)
    if(!ticket){
      callback({
        ok:false,
        msg:"Sin tickets pendientes"
      })
    }else{
      callback({
        ok:true,
        ticket
      })
    }
  });

};

module.exports = {
  socketController,
};
