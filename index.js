const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// routes
const userRouter = require("./routes/userRoute");

app.get("/", (req, res) => {
  res.sendFile("/work/chat-app-server/public/index.html");
});

app.use(express.json());
app.use("/auth", userRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});
