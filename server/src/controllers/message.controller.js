import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body; // text message
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // from isAuthenticated middleware

    // If image is also in the message(and uploaded via uploadMessageImageOptional middleware)
    let imageURL;
    if (req.file) {
      // then gets the image URL from the uploaded file
      imageURL = req.file.path; // cloudinary URL
      console.log("Image uploaded successfully:", imageURL);
    }

    // now create a new message in dB(image will be null if not provided)
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text, // nothing if not provided
      image: imageURL, // nothing if not provided
    });

    // TODO: realtime functionality goes here

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      newMessage,
    });
  } catch (err) {
    console.error("Error in sending message : ", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatWithId } = req.params;
    const loggedInUserId = req.user._id; // currentUser(Sender) :- from isAuthenticated middleware

    // get all messages where the logged-in user is either the sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userToChatWithId },
        { senderId: userToChatWithId, receiverId: loggedInUserId },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully.",
      messages,
    });
  } catch (err) {
    console.error("Error in fetching messages : ", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};
