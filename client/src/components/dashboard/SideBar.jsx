import { useDispatch, useSelector } from "react-redux";
import { User, MessageCircle, Loader2 } from "lucide-react";

import { useGetUsersQuery } from "../../features/user/userApi";
import { setSelectedUser } from "../../features/chat/chatSlice";

const SideBar = () => {
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery();
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const selectedUser = useSelector((state) => state.chat.selectedUser);

  return (
    <>
      {/* Mobile/Tablet Sidebar - Avatar only (below md) */}
      <div className="md:hidden h-full w-16 border-r border-border flex flex-col">
        <div className="flex-1 overflow-hidden">
          {isUsersLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
          ) : (
            <div className="h-full overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center py-2 space-y-2">
                {users?.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => dispatch(setSelectedUser(user))}
                    // FIX: Avatars are now rounded-full. Selected state has a ring effect.
                    className={`w-12 h-12 rounded-full relative transition-all duration-200 hover:scale-105 flex items-center justify-center group ${
                      selectedUser?._id === user._id
                        ? "ring-2 ring-sidebar-primary"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden">
                      {user?.profilePic?.url ? (
                        <img
                          src={user.profilePic.url}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/100x100/361d4d/fcfafa?text=Error";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    {/* Online/Offline status Indicator */}
                    {onlineUsers.includes(user._id) && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar - Full info (md and above) */}
      <div className="hidden md:flex h-full w-80 lg:w-96 border-r border-border flex-col">
        <div className="flex-1 overflow-hidden">
          {isUsersLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">
                  Loading users...
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto custom-scrollbar">
              <div className="p-2">
                {users?.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => dispatch(setSelectedUser(user))}
                    className={`w-full p-3 rounded-lg mb-1 text-left transition-all duration-200 group ${
                      selectedUser?._id === user._id
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full overflow-hidden ring-2 transition-all duration-200 ${
                            selectedUser?._id === user._id
                              ? "ring-primary/20"
                              : "ring-transparent group-hover:ring-primary/20"
                          }`}
                        >
                          {user?.profilePic?.url ? (
                            <img
                              src={user.profilePic.url}
                              alt={user.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/100x100/361d4d/fcfafa?text=Error";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center rounded-full">
                              <User className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        {/* Online/Offline status Indicator */}
                        {onlineUsers.includes(user._id) && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3
                            className={`font-semibold text-sm truncate ${
                              selectedUser?._id === user._id
                                ? "text-accent-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {user.name}
                          </h3>
                          {/* last timing for chat render later */}
                          {/* <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            9:42 PM
                          </span> */}
                        </div>
                        {/* last message for chat render later */}
                        {/* <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {getLastMessage(user._id)}
                        </p> */}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
