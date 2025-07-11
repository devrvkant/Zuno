import jwt from "jsonwebtoken";

import { config } from "../config/env.js";

export const generateVerificationToken = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const generateTokenAndSetCookie = (res, userId) => {
  // jwt - token
  const token = jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: "7d",
  });
  // now set it into client's cookie(Browser :- frontend user)
  res.cookie("authToken", token, {
    httpOnly: true, // to prevent XSS attacks
    secure: config.nodeEnv === "production", // because in development we have http and in production we have https
    sameSite: "strict", // to prevent csrf attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 Days
  });
  // after setting up the cookie in response finally reutrn the token for using later
  return token;
};
