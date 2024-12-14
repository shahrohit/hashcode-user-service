import { oAuthRegister, TLoginUser, TRegisterUser } from "@schemas/auth-schema";
import authRepository from "@repositories/auth-repository";

const registerOAuthUser = async (data: oAuthRegister) => {
  return await authRepository.registerOAuthUser(data);
};
const register = async (data: TRegisterUser) => {
  return await authRepository.register(data);
};

const login = async (data: TLoginUser) => {
  return await authRepository.login(data);
};

const authService = {
  register,
  login,
  registerOAuthUser,
};

export default authService;
