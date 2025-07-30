import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import socket, { connectSocket, disconnectSocket } from "../../socket/socket";
import { setOnlineUsers, setTyping } from "../../features/chat/chatSlice";
import { chatApi } from "../../features/chat/chatApi";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  // socket connection logic can be handled here
  useEffect(() => {
    connectSocket();

    //  1. listen for online users updates
    const handleOnlineUsers = (userIds) => {
      dispatch(setOnlineUsers(userIds));
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    // 2. handle new messages (from other users) in realtime
    const handleNewMessage = (message) => {
      // update RTk Query cache with new message
      dispatch(
        chatApi.util.updateQueryData(
          "getMessages",
          message.senderId,
          (draft) => {
            const exists = draft.find((msg) => msg._id === message._id);
            if (!exists) draft.push(message);
          }
        )
      );
    };

    socket.on("new_message", handleNewMessage);

    // 3. handle typing indicators
    const handleTypingIndicator = ({ userId, isTyping }) => {
      dispatch(setTyping({ userId, isTyping }));
    };

    socket.on("typing", handleTypingIndicator);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
      socket.off("new_message", handleNewMessage);
      socket.off("typing", handleTypingIndicator);
      disconnectSocket();
    };
  }, [dispatch]);

  return <Outlet />;
};

export default DashboardLayout;
