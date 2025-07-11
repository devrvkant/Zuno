import dotenv from "dotenv";
dotenv.config(); // load environment variables from .env file before doing anything else

import express from "express";

import connectToMongoDB from "./lib/mongoDB.js";
import authRouter from "./routes/auth.routes.js";

const PORT = process.env.PORT || 5500;
const app = express();

// using routes
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // As soon as the server starts, we can connect to MongoDB
  connectToMongoDB();
});
