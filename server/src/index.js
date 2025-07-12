import express from "express";

import cookieParser from "cookie-parser";

import { config } from "./config/env.js";
import connectToMongoDB from "./lib/mongoDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const PORT = config.port || 5500;
const app = express();

// using middlewares
app.use(express.json());   // allow us to parse incoming requests :- req.body
app.use(cookieParser());   // allow us to parse incoming cookies

// using routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // As soon as the server starts, we can connect to MongoDB
  connectToMongoDB();
});
