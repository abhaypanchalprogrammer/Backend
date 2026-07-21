import { app } from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("new connection established");
  socket.on("message", (msg) => {
    console.log("user fired message event");
    console.log(msg);
    io.emit("abc");
  });
});

httpServer.listen(3000, () => {
  console.log("this server is running on port number 3000");
});
