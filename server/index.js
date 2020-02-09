const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 5500;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// socket setup
io.on("connection", socket => {
  console.log("we have a new connection!!");

  socket.on("disconnect", () => {
    console.log("user has left!!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Sever has started on ${PORT}`));
