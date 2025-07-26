import { io } from "socket.io-client";
import { config } from "../config/env";

const socket = io(config.serverUrl, {
  autoConnect: false, // we'll connect manually when dashboard loads/user logs in
  withCredentials: true, // include cookies for authentication
});

export const connectSocket = () => {
  // If already connected, do nothing
  if (socket.connected) return;
  socket.connect();
};

export const disconnectSocket = () => {
  // If connected then only disconnect
  if (socket.connected) {
    socket.disconnect();
  }
};
