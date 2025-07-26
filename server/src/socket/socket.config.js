import { Server } from "socket.io";

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

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};
