import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const DB_URI = process.env.MONGODB_URI;
    if (!DB_URI)
      throw new Error("MONGODB_URI is not defined in environment variables");

    await mongoose.connect(DB_URI);

    console.log("MongoDB connected!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

export default connectToMongoDB;
