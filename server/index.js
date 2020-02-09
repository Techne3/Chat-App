const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5500;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// socket setup
io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    // console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // sent to the useEffect in Chat.js  with a payload of a user and text
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("user has left!!");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Sever has started on ${PORT}`));
