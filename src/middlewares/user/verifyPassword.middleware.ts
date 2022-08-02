import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/client";

const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { currentPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return res.json({ status: "error" });
  }

  const verify = await compare(currentPassword, user.password);
  if (!verify) {
    return { status: "error" };
  }

  return next();
};

export default verifyPassword;
