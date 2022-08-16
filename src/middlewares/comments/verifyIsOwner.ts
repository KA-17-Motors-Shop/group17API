import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyIsOwnerComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const { id } = req.params;

  const comments = await prisma.comments.findUnique({ where: { id } });

  if (!comments) {
    throw new AppError(404, "Não encontrado");
  }

  if (comments.userId !== userId) {
    throw new AppError(401, "Não autorizado");
  }

  return next();
};

export default verifyIsOwnerComment;
