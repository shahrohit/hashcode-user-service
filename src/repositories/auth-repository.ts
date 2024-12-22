import prisma from "@config/db-config";

import { oAuthRegister, TLoginUser, TRegisterUser } from "@schemas/auth-schema";

import generatePassword from "@utils/generate-password";
import { generateHashPassword, verifyPassword } from "@utils/fn";
import { Conflict, NotFound } from "@utils/errors";
import { USER } from "@utils/strings";

const registerOAuthUser = async (data: oAuthRegister) => {
  let user = await prisma.user.findUnique({ where: { email: data.email } });
  if (user) {
    return {
      name: user.name,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      role: USER,
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

  return {
    name: data.name,
    email: data.email,
    username: data.username,
    avatar: data.avatar,
    role: USER,
  };
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
    },
  });
};

const login = async (data: TLoginUser) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new NotFound("Invalid Credentail");

  const isValidPw = await verifyPassword(data.password, user.password);
  if (!isValidPw) throw new NotFound("Invalid Credentail");

  return {
    name: user.name,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    role: USER,
  };
};

const getUser = async (email: string, username: string) => {
  return await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
    select: {
      email: true,
      username: true,
    },
  });
};
const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      avatar: true,
      email: true,
      name: true,
      username: true,
    },
  });
  if (!user) throw new NotFound("User Not Found");
  return user;
};
const getUserIdByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
    },
  });
  return user;
};

const authRepository = {
  register,
  login,
  registerOAuthUser,
  getUser,
  getUserByUsername,
  getUserIdByUsername,
};

export default authRepository;
