import axios from "axios";
import { StatusCodes } from "http-status-codes";
import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

const requestController =
  (SERVICE_URL: string) => async (req: Req, res: Res, next: NextFn) => {
    try {
      const url = `${SERVICE_URL}${req.originalUrl}`;
      const response = await axios({
        url: url,
        method: req.method,
        data: req.body,
      });

      res
        .status(response.status ?? StatusCodes.INTERNAL_SERVER_ERROR)
        .json(response.data);
    } catch (error) {
      next(error);
    }
  };

export default requestController;
