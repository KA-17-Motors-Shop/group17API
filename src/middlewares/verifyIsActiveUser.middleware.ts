import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";
import AppError from "../errors/appError";

const verifyIsActiveUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = request;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(401, "Não autorizado");
  }

  if (!user.isActivate) {
    throw new AppError(401, "Ative seu usário para continuar");
  }

  return next();
};

export default verifyIsActiveUser;
