import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyIsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { id } = req.params;

  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    throw new AppError(404, "Não encontrado");
  }

  if (announcement.sellerId !== userId) {
    throw new AppError(401, "Não autorizado");
  }

  return next();
};

export default verifyIsOwner;
