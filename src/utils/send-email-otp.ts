import mailsender from "@config/email-config";

const getTemplate = (name: string, otp: number) => {
  return `
  <html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #0073e6;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">

        <p>Dear <strong>${name}</strong>,</p>
        <p>Your one-time password (OTP):</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone for your security.</p>
    </div>
</body>
</html>
  `;
};

const sendEmailVerificationOTP = async (
  toEmail: string,
  name: string,
  otp: number,
) => {
  await mailsender.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your OTP Code",
    html: getTemplate(name, otp),
  });
};

export default sendEmailVerificationOTP;
