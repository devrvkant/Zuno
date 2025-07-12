
export const uploadProfilePic = (req, res) => {
    console.log("user : ", req.user);
  // Logic for uploading profile picture
  res.status(200).json({ message: "Profile picture uploaded successfully" });
};
