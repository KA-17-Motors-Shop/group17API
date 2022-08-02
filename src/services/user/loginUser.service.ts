import { compare } from "bcryptjs";
import { sign as signJWT } from "jsonwebtoken";
import { prisma } from "../../prisma/client";

interface ILogin {
  email: string;
  password: string;
}

const loginUserService = async ({ email, password }: ILogin) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { status: "error" };
  }

  const verify = await compare(password, user.password);
  if (!verify) {
    return { status: "error" };
  }

  const token = signJWT({ userId: user.id }, String(process.env.SECRET_KEY), {
    expiresIn: "1d",
  });

  return { token };
};

export default loginUserService;
