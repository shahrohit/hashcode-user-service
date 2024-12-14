import prisma from "@config/db-config";
import { Conflict, Unauthorized } from "@utils/errors";
import { oAuthRegister, TLoginUser, TRegisterUser } from "@schemas/auth-schema";
import { generateHashPassword, verifyPassword } from "@utils/fn";
import { USER } from "@utils/strings";
import generatePassword from "@/utils/generatePassword";

const registerOAuthUser = async (data: oAuthRegister) => {
  let user = await prisma.user.findUnique({ where: { email: data.email } });
  if (user) {
    return {
      username: user.username,
    };
  }

  const password = generatePassword(8);
  const hashedPassword = await generateHashPassword(password);

  await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return { username: data.username };
};

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

const getUser = async (email: string, username: string) => {
  return await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
};

const authRepository = {
  register,
  login,
  registerOAuthUser,
  getUser,
};

export default authRepository;
