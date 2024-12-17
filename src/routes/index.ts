import express from "express";

import authRouter from "@routes/auth-route";
import userRouter from "@routes/users/index";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
