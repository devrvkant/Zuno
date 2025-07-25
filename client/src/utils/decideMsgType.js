const decideMsgType = (message, selectedImage) => {
  // Decide the type of message based on whether it has an image or not
  if (selectedImage) {
    // Use formData to send messages that have image
    const formData = new FormData();
    // only add the text if it is not empty
    if (message.trim()) formData.append("text", message.trim());
    formData.append("image", selectedImage.file);
    return formData;
  } else {
    // Use JSON to send messages that have text only
    return {
      text: message.trim(),
    };
  }
};

export default decideMsgType;
