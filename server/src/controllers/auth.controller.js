import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/user.model.js";
import { config } from "../config/env.js";
import { generateVerificationToken, generateTokenAndSetCookie } from "../utils/authUtils.js";
import { sendPasswordResetEmail, sendSuccessEmailForPasswordReset, sendVerificationEmail, sendWelcomeEmail } from "../services/resend/emails.js";

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
  try {
    const { email, password } = req.body;
    if(!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email and password are required!",
      });

    // find if provided username(user) exists in dB or not
    // we can login the user with email or password whatever we want because they both are unique in our schema
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid user credentials!",
      });
    // now check if password is correct or not
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return res.status(400).json({
        success: false,
        message: "Invalid user credentials!",
      });
    // otherWise the email and password both are correct for a user and now start the actual login process
    // generate jwt-token and set cookie to logIn the user
    generateTokenAndSetCookie(res, user._id);
    // finally update the lastLogin to current dateTime for updating login history
    user.lastLogin = new Date();
    // finally update these changes in dB
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful.",
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

export const logOut = async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: config.env === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const verifyEmail = async (req, res) => {
    try {
    const { verificationOTP } = req.body;
    if (!verificationOTP)
      return res.status(400).json({
        success: false,
        message: "VerificationOTP is missing!",
      });

    // find the user with verificationOTP which stored as verificationToken in dB
    const user = await User.findOne({
      verificationToken: verificationOTP,
      verificationTokenExpiresAt: { $gt: Date.now() }, // acts as a condition only return the user if verificationToken is not expired
    });

    if (!user)
      return res.status(400).json({
        status: false,
        message: "Invalid or Expired verification code!",
      });

    // now verify the user
    user.isVerified = true;
    // and delete the verificationToken and its Expiring field, because they are not needed now
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    // finally update these changes in dB
    await user.save();

    // now send a welcomeEmail
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message:
        "Email verified successfully, Welcome email is sent for verified email.",
      user: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const forgotPassword = async (req, res) => {
 try {
    const { email } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User dosen't exist with this email, In our app!",
      });

    // now continoue the process
    // 1. generate password resetToken
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // In 1 hour after generating
    // 2. save them in dB
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // now send the email with resetPassword link
    const resetLink = `${config.clientUrl}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const resetPassword = async (req, res) => {
   try {
    const { token } = req.params;
    const { password } = req.body;

    // find the user with token while also validating that token must not be expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    }).select("+password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset link.",
      });
    // otherWise update the password
    // 1. hash the incoming new password from client
    const hashedPassword = await bcrypt.hash(password, 10);
    // 2. now update and save it in dB
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // send the successEmail for password reset
    await sendSuccessEmailForPasswordReset(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};
