// Global user socket map to track online users
const userSocketMap = new Map(); // userId -> socketId mapping

const userHandler = (socket, io) => {
  // when a client connects simply that is online
  userSocketMap.set(socket.userId, socket.id);

  // Notify other users that this user is online (send userIds)
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  // Cleanup function to handle disconnections(user goes offline) :- called by centralized disconnect handler
  const cleanup = () => {
    // on disconnect, remove the user from the map(make offline)
    userSocketMap.delete(socket.userId);
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  };

  return { cleanup };
};

export default userHandler;
