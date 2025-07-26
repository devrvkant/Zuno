import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import socket, { connectSocket, disconnectSocket } from "../../socket/socket";
import { setOnlineUsers } from "../../features/chat/chatSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  // socket connection logic can be handled here
  useEffect(() => {
    connectSocket();

    // listen for online users updates
    const handleOnlineUsers = (userIds) => {
      dispatch(setOnlineUsers(userIds));
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    return () => {
      socket.off("getOnlineUsers", handleOnlineUsers);
      disconnectSocket();
    };
  }, []);

  return <Outlet />;
};

export default DashboardLayout;
