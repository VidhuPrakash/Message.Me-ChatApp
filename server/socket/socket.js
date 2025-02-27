import { Server } from "socket.io";
import http, { METHODS } from "http";
import express from "express";
import { Socket } from "dgram";
import dotenv from "dotenv";
import Message from "../models/message.model.js";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = [];
/**
 * Retrieves the socket ID associated with a given receiver ID.
 *
 * @param {string} receiverId - The ID of the receiver whose socket ID is to be retrieved.
 * @returns {string} The socket ID associated with the specified receiver ID.
 */

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", async (socket) => {
  console.log("a user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUser", Object.keys(userSocketMap));
  //   socket.on() is used to listen to the event
  // Find undelivered messages for this user
  const undeliveredMessages = await Message.find({
    receiverId: userId,
    status: "sent",
  });
  if (undeliveredMessages.length > 0) {
    await Message.updateMany(
      { receiverId: userId, status: "sent" },
      { $set: { status: "delivered" } }
    );

    undeliveredMessages.forEach((msg) => {
      io.to(getReceiverSocketId(msg.senderId)).emit("messageDelivered", {
        messageId: msg._id,
        status: "delivered",
      });
    });
  }
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
