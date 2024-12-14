import nodemailer from "nodemailer";

import { EMAIL_PASS, EMAIL_USER } from "./server-config";

const mailsender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export default mailsender;
