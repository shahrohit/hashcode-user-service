import mailsender from "@config/email-config";

const sendEmailVerificationOTP = async (toEmail: string, otp: number) => {
  await mailsender.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 20 minutes.`,
  });
};

export default sendEmailVerificationOTP;
