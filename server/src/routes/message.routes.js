import { Router } from "express";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = Router();

// get messages for a conversation that the user is part of, by userId
messageRouter.get("/:id", isAuthenticated, getMessages);

// send message to a user(receiverId)
messageRouter.post("/:id", isAuthenticated, sendMessage);

export default messageRouter;
