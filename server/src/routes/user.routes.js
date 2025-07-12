import { Router } from "express";

import { uploadProfilePic } from "../middlewares/upload.middleware.js";
import { uploadProfilePicture } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// upload profile picture
userRouter.post("/profile-pic", isAuthenticated, uploadProfilePic.single("image"), uploadProfilePicture);

export default userRouter;
