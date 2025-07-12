import jwt from "jsonwebtoken";

import { config } from "../config/env.js";
import User from "../models/user.model.js";

// for checking if user is authenticated(loggedIn or not)
export const isAuthenticated = async (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;
    if (!authToken)
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No authToken provided!",
      });
    // now decode the authToken
    // 1. first decode it
    const decodedAuthToken = jwt.verify(authToken, config.jwtSecret);
    if (!decodedAuthToken)
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid Token!",
      });

    const user = await User.findById(decodedAuthToken.userId);
    // 2. find the user in the dB
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Authentication failed - User not found!",
      });
    // 3. and then attach the user to req for further use
    req.user = user;
    // finally call the next function
    next();
  } catch (err) {
    console.error("Error in isAuthenticated middleware : ", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};
