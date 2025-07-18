import User from "../models/user.model.js";
import cloudinary from "../services/cloudinary/cloudinary.config.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // from isAuthenticated middleware

    // get all users except the loggedIn user
    const users = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      users
    });
  } catch (err) {
    console.error("Error in fetching users : ", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "No file uploaded, Please upload a profile picture.",
      });

    const user = req.user; // from isAuthenticated middleware

    // delete previous profile picture if exists
    if (user.profilePic && user.profilePic.public_id)
      await cloudinary.uploader.destroy(user.profilePic.public_id);

    // now upload the new profile picture
    user.profilePic = {
      public_id: req.file.filename,
      url: req.file.path,
    };
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully.",
      user: {
        ...user._doc,
      },
    });
  } catch (err) {
    console.error("Error in uploading profilePic : ", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};
