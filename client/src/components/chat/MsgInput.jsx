import { useState, useEffect, useRef } from "react";
import { SendHorizonal, Image as ImageIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSendMessageMutation } from "../../features/chat/chatApi";
import { useFileUpload } from "../../hooks/use-file-upload";
import decideMsgType from "../../utils/decideMsgType";
import socket from "../../socket/socket";

const MessageInput = () => {
  const timeoutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((state) => state.chat);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const [{ files, errors }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      maxSize: 10 * 1024 * 1024, // 10MB limit
      multiple: false,
    });

  const selectedImage = files[0];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Immediately clear the input field and remove the selected image
    setMessage("");
    if (selectedImage) {
      removeFile(selectedImage.id);
    }
    try {
      // FinalMsg with text/image or both and with trimmed text
      const finalMsg = decideMsgType(message, selectedImage); // message = text, selectedImage = image file

      // send message to the server
      await sendMessage({
        userId: selectedUser._id,
        msg: finalMsg,
      }).unwrap();
    } catch (err) {
      console.error("Failed to send message:", err.message);
      toast.error("Failed to send message.");
    }
  };

  // Show file validation errors
  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        if (error.includes("size") || error.includes("large")) {
          toast.error(`Image size is too large! Maximum size is 10MB.`);
        } else if (error.includes("type") || error.includes("format")) {
          toast.error(`Invalid file type! Please select an image.`);
        } else {
          toast.error(error);
        }
      });
    }
  }, [errors]);

  const handleMsgTyping = (e) => {
    setMessage(e.target.value);

    setIsTyping(true);
    socket.emit("typing", { isTyping: true, userId: selectedUser._id });

    // clear previous timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", { isTyping: false, userId: selectedUser._id });
    }, 500);
  };

  return (
    <div className="p-2 sm:p-3">
      {/* Image Preview */}
      {selectedImage && (
        <div className="relative w-24 h-24 mb-2 rounded-lg">
          <img
            src={selectedImage.preview}
            alt="Selected preview"
            className="w-full h-full object-cover rounded-md"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={() => removeFile(selectedImage.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={openFileDialog}
              className="h-9 w-9"
            >
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
            <input {...getInputProps()} className="sr-only" />
          </div>

          <Input
            name="message"
            type="text"
            placeholder="Message..."
            value={message}
            onChange={handleMsgTyping}
            className="h-11 bg-muted border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-12 pr-4 text-base"
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          size="icon"
          className="h-11 w-11 flex-shrink-0"
          disabled={!message.trim() && !selectedImage}
        >
          <SendHorizonal className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
