import { Router } from "express";

import { uploadProfilePic } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// upload profile picture
userRouter.post("/profile-pic", isAuthenticated, uploadProfilePic);

export default userRouter;
