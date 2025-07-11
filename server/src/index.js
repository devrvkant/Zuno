import dotenv from "dotenv";
dotenv.config(); // load environment variables from .env file before doing anything else
import express from "express";

const PORT = process.env.PORT || 5500;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
