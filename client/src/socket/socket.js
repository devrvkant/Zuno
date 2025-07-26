import { io } from "socket.io-client";
import { config } from "../config/env";

const socket = io(config.serverUrl, {
  autoConnect: false,
  withCredentials: true,
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

export default socket;
