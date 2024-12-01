import prisma from "@config/db-config";
import { Conflict, Unauthorized } from "@utils/errors";
import { TLoginUser, TRegisterUser } from "@schemas/auth-schema";
import { generateHashPassword, verifyPassword } from "@utils/fn";
import { USER } from "@utils/strings";

const register = async (data: TRegisterUser) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (user) throw new Conflict("User Already Exist");

  const hashedPassword = await generateHashPassword(data.password);
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      username: data.username,
      country: data.country,
    },
  });
};

const login = async (data: TLoginUser) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Unauthorized("Invalid Credentail");

  const isValidPw = await verifyPassword(data.password, user.password);
  if (!isValidPw) throw new Unauthorized("Invalid Credentail");

  return {
    name: user.name,
    email: user.email,
    username: user.username,
    country: user.country,
    role: USER,
  };
};

const authRepository = {
  register,
  login,
};

export default authRepository;
