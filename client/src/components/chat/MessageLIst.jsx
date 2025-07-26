import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble"; // Import the unified component

const MessageList = ({ messages, loggedInUser }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-3 p-2 sm:p-4">
      {messages.map((message) => {
        const isSender = message.senderId === loggedInUser._id;
        return (
          <MessageBubble
            key={message._id}
            message={message}
            isSender={isSender}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;