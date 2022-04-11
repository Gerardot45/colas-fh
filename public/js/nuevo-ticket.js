const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const botonCrear = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  // console.log('Conectado');

  botonCrear.disabled = false;
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');

  botonCrear.disabled = true;
});

socket.on("ultimo-ticket", (ultimo) => {
  lblNuevoTicket.innerText = "Ticket " + ultimo;
});

botonCrear.addEventListener("click", () => {
  socket.emit("siguiente-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});
