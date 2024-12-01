import express from "express";

import requestController from "@controller/request-controller";
import { ADMIN_SERVICE_URL } from "@config/server-config";

const topicRouter = express.Router();

topicRouter.get("/", requestController(ADMIN_SERVICE_URL));

export default topicRouter;
