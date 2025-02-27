import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiDescription Logs the user in using username and password.
 *
 * @apiParam {String} username The username of the user.
 * @apiParam {String} password The password of the user.
 *
 * @apiSuccess {String} _id The id of the user
 * @apiSuccess {String} fullname The full name of the user
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} profilePic The URL of the profile picture of the user
 *
 * @apiError {String} error The error message.
 *
 * @apiErrorExample {json} Invalid username or password
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "Invalid username or password"
 * }
 *
 * @apiErrorExample {json} Internal Server Error
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internel Server Error!"
 * }
 */
export const login = async (req, res) => {
  try {
    const { username: userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!isPasswordCorrect || !user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user.id,
      fullname: user.fullName,
      username: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error  in Login controller", error.message);
    res.status(500).json({ error: "Internel Server Error!" });
  }
};

/**
 * @api {post} /signup Signup
 * @apiName Signup
 * @apiGroup Auth
 * @apiDescription Creates a new user account.
 *
 * @apiParam {String} fullname The full name of the user.
 * @apiParam {String} username The username of the user.
 * @apiParam {String} password The password of the user.
 * @apiParam {String} confirmPassword The confirmation of the password of the user.
 * @apiParam {String} gender The gender of the user.
 *
 * @apiSuccess {String} _id The id of the user
 * @apiSuccess {String} fullname The full name of the user
 * @apiSuccess {String} username The username of the user
 * @apiSuccess {String} profilePic The URL of the profile picture of the user
 *
 * @apiError {String} error The error message.
 *
 * @apiErrorExample {json} Invalid userdata
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "Invalid userdata"
 * }
 *
 * @apiErrorExample {json} Username already exists
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "Username already exists."
 * }
 *
 * @apiErrorExample {json} Internal Server Error
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internel Server Error!"
 * }
 */
export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // HASH Password
    const salt = await bcryptjs.genSalt(15);
    const hashedpassword = await bcryptjs.hash(password, salt);

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName: fullname,
      userName: username,
      password: hashedpassword,
      gender: gender,
      profilePic: gender === "male" ? boyProfile : girlProfile,
    });
    if (newUser) {
      // Generate  JWT and add it to the response header as
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser.id,
        fullname: newUser.fullName,
        username: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid userdata" });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.userName) {
      return res.status(400).json({ error: "Username already exists." });
    }
    console.log("Error  in Sign Up controller", error.message);
    res.status(500).json({ error: "Internel Server Error!" });
  }
};

/**
 * @api {post} /logout Logout
 * @apiName Logout
 * @apiGroup Auth
 * @apiDescription Logs the user out by clearing the JWT cookie.
 *
 * @apiSuccess {String} message A success message.
 *
 * @apiError {String} error The error message.
 *
 * @apiErrorExample {json} Internal Server Error
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internel Server Error!"
 * }
 */

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("Error  in Logout controller", error.message);
    res.status(500).json({ error: "Internel Server Error!" });
  }
};
