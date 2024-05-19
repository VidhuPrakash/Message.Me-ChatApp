import { Server } from "socket.io";
import http, { METHODS } from "http";
import express from "express";
import { Socket } from "dgram";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = [];
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }
  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUser", Object.keys(userSocketMap));
  //   socket.on() is used to listen to the event
  socket.on("disconnect", () => {
    console.log("a user is disconnected", socket.id);
    const disconnectedUserId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    );
    if (disconnectedUserId) {
      delete userSocketMap[disconnectedUserId];
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    }
  });
});

export { app, io, server };
