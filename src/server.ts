import express from "express";
import bodyParser from "body-parser";

import { PORT } from "@config/server-config";
import errorHandler from "@middlewares/error-handler";
import apiRouter from "@routes/index";
import checkHealth from "./controller/health-controller";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);
app.use("/health", checkHealth);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
