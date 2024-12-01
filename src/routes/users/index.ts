import express from "express";

import languageRouter from "@routes/users/language-route";
import topicRouter from "./topic-route";
import problemRouter from "./problem-route";

const userRouter = express.Router();

userRouter.use("/topics", topicRouter);
userRouter.use("/languages", languageRouter);
userRouter.use("/problems", problemRouter);

export default userRouter;
