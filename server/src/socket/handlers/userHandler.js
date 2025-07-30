// Global user socket map to track online users
const userSocketMap = new Map(); // userId -> socketId mapping

const userHandler = (socket, io) => {
  // 1. Messaging functionality --->
  // for one to one messaging
  socket.join(socket.userId); // Join the room named after the user's ID

  // 2. Online status management --->
  // when a client connects simply that is online
  userSocketMap.set(socket.userId, socket.id);

  // Notify other users that this user is online (send userIds)
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // 3. handle typing events
  socket.on("typing", ({ isTyping, userId }) => {
    socket.to(userId).emit("typing", { isTyping, userId: socket.userId });
  });

  // Cleanup function to handle disconnections(user goes offline) :- called by centralized disconnect handler
  const cleanup = () => {
    // on disconnect, remove the user from the map(make offline)
    userSocketMap.delete(socket.userId);
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    // on disconnect, leave the room
    socket.leave(socket.userId);
  };

  return { cleanup };
};

export default userHandler;
