import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyIsSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(401, "Não autorizado");
  }

  if (!user.isSeller) {
    throw new AppError(401, "Não autorizado");
  }

  return next();
};

export default verifyIsSeller;
