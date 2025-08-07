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
    origin:
      config.nodeEnv === "production"
        ? ["https://brave-wave-05bb48f00.2.azurestaticapps.net"]
        : [
            "http://localhost:5173",
            "https://brave-wave-05bb48f00.2.azurestaticapps.net",
          ],
    credentials: true,
  })
); // prevent from CORS errors(allow cross origin access)
app.use(cookieParser()); // allow us to parse incoming cookies

// using routes
app.get("/", (req, res) => {
  res.send("Welcome to Zuno Server!");
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // As soon as the server starts, we can connect to MongoDB
  connectToMongoDB();
});
