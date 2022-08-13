import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyIsCompledet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    throw new AppError(404, "Não encontrado");
  }

  if (announcement.status === "completed") {
    throw new AppError(409, "Este anúncio já foi finalizado");
  }

  return next();
};

export default verifyIsCompledet;
