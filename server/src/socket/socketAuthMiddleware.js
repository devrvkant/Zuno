import jwt from "jsonwebtoken";

import { config } from "../config/env.js";
import User from "../models/user.model.js";

// Clean cookie parsing utility
const parseCookies = (cookieString) => {
  const cookies = {};
  if (cookieString) {
    cookieString.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
  }
  return cookies;
};

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // Clean cookie parsing
    const cookies = parseCookies(socket.handshake.headers.cookie);
    const token = cookies.authToken;

    if (!token) {
      return next(new Error("Authentication token required"));
    }

    // Verify JWT token
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Get user from database
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      console.log('User not found in database');
      return next(new Error("User not found"));
    }

    // Attach user info to socket instance
    socket.userId = user._id.toString();
    socket.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    };
    
    next();
    
  } catch (error) {
    console.error("Socket authentication failed:", error.message);
    next(new Error(`Authentication failed: ${error.message}`));
  }
};