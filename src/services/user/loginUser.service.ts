import { compare } from "bcryptjs";
import { sign as signJWT } from "jsonwebtoken";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

interface ILogin {
  email: string;
  password: string;
}

const loginUserService = async ({ email, password }: ILogin) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(404, "Email ou senha incorretos");
  }

  const verify = await compare(password, user.password);
  if (!verify) {
    throw new AppError(404, "Email ou senha incorretos");
  }

  const token = signJWT({ userId: user.id }, String(process.env.SECRET_KEY), {
    expiresIn: "1d",
  });

  return { token };
};

export default loginUserService;
