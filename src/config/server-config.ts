import dotenv from "dotenv";

import { DEV_ENV } from "@utils/strings";

dotenv.config();

export const PORT = +(process.env.PORT || 4002);
export const NODE_ENV = process.env.NODE_ENV || DEV_ENV;
export const ADMIN_SERVICE_URL = process.env.ADMIN_SERVICE_URL!;