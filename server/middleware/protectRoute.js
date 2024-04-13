import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ error: "Unauthorized -No Token  Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      res.status(401).json({ error: "Unauthorized -Invalid Token  Provided" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute Middleware", error.message);
    res.status(500).json({ error: "Internel server error" });
  }
};

export default protectRoute;
