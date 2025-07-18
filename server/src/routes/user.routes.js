import { Router } from "express";

import { uploadProfilePic } from "../middlewares/upload.middleware.js";
import { getUsers, uploadProfilePicture } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// get all users for sidebar
userRouter.get("/", isAuthenticated, getUsers);

// upload profile picture
userRouter.post("/profile-pic", isAuthenticated, uploadProfilePic.single("image"), uploadProfilePicture);

export default userRouter;
