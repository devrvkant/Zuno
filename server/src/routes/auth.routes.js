import { Router } from "express";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { signUp, logIn, logOut, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";

const authRouter = Router();

// for getting the currently loggedIn user 
authRouter.get("/check-auth", isAuthenticated, checkAuth);

// signup(register) a new user
authRouter.post("/signup", signUp);

// login an existing user
authRouter.post("/login", logIn);

// logout an existing user
authRouter.post("/logout", logOut);

// for verifying emails during accounts creation
authRouter.post("/verify-email", verifyEmail);

// for requesting the passwordReset and recieve the link through email :- forgotPassword
authRouter.post("/forgot-password", forgotPassword);

// for settingUp new password and get the success email :- resetPassword
authRouter.patch("/reset-password/:token", resetPassword)

export default authRouter;