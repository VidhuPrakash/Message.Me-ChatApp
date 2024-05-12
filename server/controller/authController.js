import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { username: userName, password } = req.body;
    const user = await User.findOne({ userName });
    console.log(user?.password);
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

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("Error  in Logout controller", error.message);
    res.status(500).json({ error: "Internel Server Error!" });
  }
};
