import User from "../models/user.model.js";

/**
 * Retrieves a list of users excluding the currently logged-in user.
 *
 * This function queries the database to find all users except the one
 * currently logged in, based on the user ID stored in the request object.
 * The resulting list excludes passwords and is returned in the response.
 *
 * @param {Object} req - The request object containing user information.
 * @param {Object} res - The response object used to send back the filtered user list.
 */

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // exclude the user who is currently logged in
    res.status(200).json(filteredUser);
  } catch (error) {
    console.error("Error in getUserForSidebar controller", error.message);
    res.status(500).json({ error: "Internel server error" });
  }
};
