import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MsgInput";
import MessagesSkeleton from "./MessagesSkeleton";
import { useGetMessagesQuery } from "../../features/chat/chatApi";

const ChatContainer = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const { data: messages, isLoading: areMessagesLoading } = useGetMessagesQuery(
    selectedUser?._id
  );

  console.log("Messages: ", messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full ">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-2 sm:p-3 custom-scrollbar">
        {areMessagesLoading ? (
          <MessagesSkeleton />
        ) : messages && messages.length > 0 ? (
          <div className="flex flex-col gap-4">
            {messages.map((message) => {
              const isSender = message.senderId === loggedInUser._id;
              return (
                <div
                  key={message._id}
                  className={`flex items-end gap-2 ${
                    isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isSender && (
                    <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0">
                      {selectedUser?.profilePic?.url && (
                        <img
                          src={selectedUser.profilePic.url}
                          alt={selectedUser.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                    </div>
                  )}
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl text-sm md:text-base ${
                      isSender
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  {isSender && (
                    <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0">
                      {loggedInUser?.profilePic?.url && (
                        <img
                          src={loggedInUser.profilePic.url}
                          alt={loggedInUser.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-6">
              <MessageCircle className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No messages yet
              </h3>
              <p className="text-sm text-muted-foreground/70 max-w-sm">
                Start a conversation with {selectedUser?.name} by sending your
                first message!
              </p>
            </div>
            <div className="text-xs text-muted-foreground/50">
              💬 Say hello and break the ice.
            </div>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
