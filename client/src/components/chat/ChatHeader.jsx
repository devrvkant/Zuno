import { useSelector } from "react-redux";
import { User } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useSelector((state) => state.chat);
  const isOnline = onlineUsers.includes(selectedUser?._id);

  if (!selectedUser) return null;

  return (
    <div className="flex items-center gap-3 p-2 sm:p-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          {selectedUser.profilePic?.url ? (
            <img
              src={selectedUser.profilePic.url}
              alt={selectedUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-full h-full text-muted-foreground p-2" />
          )}
        </div>
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
        )}
      </div>
      <div>
        <h2 className="font-semibold text-foreground">{selectedUser.name}</h2>
        <p className={`text-xs ${isOnline ? "text-green-500" : "text-muted-foreground"}`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;