import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";

import { config } from "./config/env.js";
import connectToMongoDB from "./lib/mongoDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import { configureSocket } from "./socket/socket.config.js";

const PORT = config.port || 5500;
const app = express();
const server = createServer(app);

// configure socket.io on the server
const io = configureSocket(server);
export { io };

// using middlewares
app.use(express.json()); // allow us to parse incoming requests :- req.body
app.use(
  cors({
    // origin: "http://localhost:5173",   // specify the exact frontend origin
    origin: [
      "http://localhost:5173", // for local development
      "http://192.168.1.23:5173", // for mobile testing
    ],
    credentials: true, // allow credentials (cookies, authorization headers)
  })
); // prevent from CORS errors(allow cross origin access)
app.use(cookieParser()); // allow us to parse incoming cookies

// using routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // As soon as the server starts, we can connect to MongoDB
  connectToMongoDB();
});
