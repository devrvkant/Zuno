import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MsgInput";
import MessagesSkeleton from "./MessagesSkeleton";
import { useGetMessagesQuery } from "../../features/chat/chatApi";

const ChatContainer = () => {
  const { selectedUser, messages } = useSelector((state) => state.chat);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const { data: fetchedMessages, isLoading: areMessagesLoading } =
    useGetMessagesQuery(selectedUser?._id);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, fetchedMessages]);

  return (
    <div className="flex flex-col h-full ">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-2 sm:p-3 custom-scrollbar">
        {areMessagesLoading ? (
          <MessagesSkeleton />
        ) : (
          <div className="flex flex-col gap-4">
            {(fetchedMessages || messages).map((message) => {
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
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;