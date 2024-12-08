import express from "express";

import requestController from "@controller/request-controller";
import { ADMIN_SERVICE_URL } from "@config/server-config";

const problemRouter = express.Router();

problemRouter.get("/", requestController(ADMIN_SERVICE_URL));
problemRouter.get("/search", requestController(ADMIN_SERVICE_URL));
problemRouter.get("/:slug", requestController(ADMIN_SERVICE_URL));
problemRouter.get("/:slug/description", requestController(ADMIN_SERVICE_URL));
problemRouter.get("/:slug/testcases", requestController(ADMIN_SERVICE_URL));
problemRouter.get("/:slug/codes", requestController(ADMIN_SERVICE_URL));

export default problemRouter;
