import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/appError";
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
    throw new AppError(404, "Não encontrado");
  }

  const verify = await compare(currentPassword, user.password);
  if (!verify) {
    throw new AppError(401, "Não autorizado");
  }

  return next();
};

export default verifyPassword;
