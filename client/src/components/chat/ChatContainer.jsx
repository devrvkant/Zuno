import { useSelector } from "react-redux";
import { MessageCircle } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MsgInput";
import MessagesSkeleton from "./MessagesSkeleton";
import { useGetMessagesQuery } from "../../features/chat/chatApi";
import MessageList from "./MessageList";

const ChatContainer = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const { data: messages, isLoading: areMessagesLoading } = useGetMessagesQuery(
    selectedUser?._id,
    {
      // This ensures the query re-runs when the selected user changes
      skip: !selectedUser,
    }
  );

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {areMessagesLoading ? (
          <MessagesSkeleton />
        ) : messages && messages.length > 0 ? (
          // Render the MessageList component, passing the necessary props
          <MessageList messages={messages} loggedInUser={loggedInUser} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-6">
              <MessageCircle className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No messages yet
              </h3>
              <p className="text-sm mx-1 text-muted-foreground/70 max-w-sm">
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
