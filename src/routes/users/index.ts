import express from "express";

import languageRouter from "@routes/users/language-route";
import topicRouter from "@routes/users/topic-route";
import problemRouter from "@routes/users/problem-route";
import authController from "@controller/auth-controller";

const userRouter = express.Router();

userRouter.use("/topics", topicRouter);
userRouter.use("/languages", languageRouter);
userRouter.use("/problems", problemRouter);
userRouter.get("/id/:username", authController.getUserIdByUsername);
userRouter.get("/:username", authController.getUserByUsername);

export default userRouter;
