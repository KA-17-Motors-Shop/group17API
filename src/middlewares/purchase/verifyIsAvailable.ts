import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyIsAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { value } = req.body;

  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    throw new AppError(404, "Não encontrado");
  }

  if (announcement.type === "auction") {
    throw new AppError(
      409,
      "Este anúncio é do tipo leilão, faça um lance para compra-lo"
    );
  }

  if (announcement.status === "stopped") {
    throw new AppError(
      409,
      "Este anúncio não está disponível pra compra no momento"
    );
  }

  if (announcement.price > value) {
    throw new AppError(409, "Valor não é suficiente para compra");
  }

  return next();
};

export default verifyIsAvailable;
