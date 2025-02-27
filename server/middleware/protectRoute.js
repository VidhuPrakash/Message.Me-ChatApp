import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Middleware function to protect routes by verifying JWT token.
 * 
 * This function checks for the presence of a JWT token in the cookies.
 * If the token is missing or invalid, it responds with an unauthorized error.
 * If the token is valid, it decodes the token to retrieve the user ID, fetches
 * the user from the database (excluding the password), and attaches the user
 * data to the request object. If the user is not found, it responds with a
 * "User not found" error. If any error occurs during the process, it logs the
 * error and responds with an internal server error.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized -No Token  Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized -Invalid Token  Provided" });
    }
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute Middleware:", error.message);
    res.status(500).json({ error: "Internel server error" });
  }
};

export default protectRoute;
