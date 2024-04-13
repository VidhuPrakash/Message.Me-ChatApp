import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";

import connectTomongoDB from "./Database/connectToMongodb.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

app.get("/", (req, res) => {
  res.send("Server says Hello World!!");
});

app.listen(PORT, () => {
  connectTomongoDB();
  console.log(`Server Running on port ${PORT}`);
});
