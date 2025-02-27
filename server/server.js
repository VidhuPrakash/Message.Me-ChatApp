import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
dotenv.config();
import connectTomongoDB from "./Database/connectToMongodb.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server says Hello World!!");
});

server.listen(PORT, () => {
  connectTomongoDB();
  console.log(`Server Running on port ${PORT}`);
});
