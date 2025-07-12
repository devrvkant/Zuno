import dotenv from "dotenv";

dotenv.config();   // Load environment variables from .env file

export const config = {
    port: process.env.PORT || 5500,
    mongoDbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    resendApiKey: process.env.RESEND_API_KEY,
    senderEmail: process.env.SENDER_EMAIL,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: process.env.CLIENT_URL,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
}