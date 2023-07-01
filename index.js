const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "http://192.168.1.100",
});

// routes import
const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");
const chatRouter = require("./routes/chatRoute");

//
app.use(express.json());

//https://chat-app-server.iran.liara.run/

// Routes use
app.use("/auth", userRouter);
app.use("/messages", messageRouter);
app.use("/chats", chatRouter);

// socket
io.on("connection", (socket) => {
  // connected user
  console.log(`a user ${socket.id} connected`);

  socket.join(socket.userID);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.userName,
  });

  // check disconnect
  socket.on("disconnect", () => {
    log("user Disconnected");
  });

  // chat message
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });

  // private message
  socket.on("private message", ({ message, to }) => {
    socket.to(to).to(socket.userID).emit("private message", {
      message,
      from: socket.id,
      to,
    });
  });

  // users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      userName: socket.handshake.auth.userName,
    });
  }
  console.log(users);
  socket.emit("users", users);
});

// server
server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});
