import express from "express";

import { config } from "./config/env.js";
import connectToMongoDB from "./lib/mongoDB.js";
import authRouter from "./routes/auth.routes.js";

const PORT = config.port || 5500;
const app = express();

// using middlewares
app.use(express.json());   // allow us to parse incoming requests :- req.body

// using routes
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // As soon as the server starts, we can connect to MongoDB
  connectToMongoDB();
});
