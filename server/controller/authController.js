import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { userName, Password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcryptjs.compare(
      Password,
      user?.password || ""
    );

    if (!isPasswordCorrect || !user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error  in Login controller", error.message);
    res.status(500).json({ error: "Internel Server Error!" });
  }
};

export const signup = async (req, res) => {
  try {
    const { fullName, userName, Password, confirmPassword, gender } = req.body;

    if (Password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // HASH Password
    const salt = await bcryptjs.genSalt(15);
    const hashedpassword = await bcryptjs.hash(Password, salt);

    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName: fullName,
      userName: userName,
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
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid userdata" });
    }
  } catch (error) {
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
