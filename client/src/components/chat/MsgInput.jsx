import { useState } from "react";
import { SendHorizonal, Smile, Paperclip } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSendMessageMutation } from "../../features/chat/chatApi";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((state) => state.chat);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    try {
      await sendMessage({
        userId: selectedUser._id,
        message: { text: message },
      }).unwrap();
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="p-2 sm:p-3">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Icons and attachment buttons */}
        {/* <Button variant="ghost" size="icon" type="button">
          <Smile className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" type="button">
          <Paperclip className="h-5 w-5 text-muted-foreground" />
        </Button> */}
        <Input
          name="message"
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-muted border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          autoComplete="off"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isLoading}
        >
          <SendHorizonal className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
