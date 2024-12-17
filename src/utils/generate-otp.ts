const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
const generateExpiryTime = (minute: number) => {
  return Date.now() + minute * 60 * 1000;
};

export default generateOTP;
export { generateExpiryTime };
