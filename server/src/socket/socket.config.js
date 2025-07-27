import { Server } from "socket.io";

import userHandler from "./handlers/userHandler.js";
import { socketAuthMiddleware } from "./socketAuthMiddleware.js";


export const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173", // for local development
        "http://192.168.1.23:5173", // for mobile testing
      ],
      credentials: true,
    },
  });

  // use socket authentication middleware
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Here you can set up your event handlers, e.g., for chat messages
    const userHandlerInstance = userHandler(socket, io);

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);

      userHandlerInstance.cleanup();
    });
  });

  return io;
};
