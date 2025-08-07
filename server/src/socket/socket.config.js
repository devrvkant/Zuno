import { Server } from "socket.io";

import userHandler from "./handlers/userHandler.js";
import { socketAuthMiddleware } from "./socketAuthMiddleware.js";
import { config } from "../config/env.js";


export const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: config.nodeEnv === "production" ? config.serverUrl : "http://localhost:5173",
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
