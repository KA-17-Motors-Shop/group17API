import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.params;

  const [user] = await prisma.user.findMany({ where: { accessToken } });

  if (!user) {
    throw new AppError(404, "Não encontrado");
  }

  req.userId = user.id;

  return next();
};

export default verifyAccessToken;
