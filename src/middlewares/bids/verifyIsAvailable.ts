import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyIsAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    throw new AppError(404, "Não autorizado");
  }

  if (announcement.status === "stopped") {
    throw new AppError(409, "Anúncio indisponível");
  }

  return next();
};

export default verifyIsAvailable;
