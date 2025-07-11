import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import { generateVerificationToken, generateTokenAndSetCookie } from "../utils/authUtils.js";
import { sendVerificationEmail } from "../services/resend/emails.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "Name,email and password all fields are required!",
      });

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
    });
    if (existingUser)
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email is already registered!"
            : "Username is already taken!",
      });

    // hash the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate verificationToken for account verification
    const verificationToken = generateVerificationToken();

    // create the new user in dB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // now generate userToken(JWT-token) and sendIt to client with a cookie to authenticate(login automatically) the client
    generateTokenAndSetCookie(res, user._id);

    // send account verification Email to user with an OTP to verify their account
    await sendVerificationEmail(user.email, verificationToken);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const logIn = async (req, res) => {
  // Handle user login
};

export const logOut = async (req, res) => {
  // Handle user logout
};

export const verifyEmail = async (req, res) => {
  // Handle email verification
};

export const forgotPassword = async (req, res) => {
  // Handle forgot password request
};

export const resetPassword = async (req, res) => {
  // Handle password reset
};
