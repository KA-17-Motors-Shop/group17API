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
    throw new AppError(404, "Not Founded!");
  }

  if (announcement.status !== "in_progress") {
    throw new AppError(409, "Announce not available");
  }

  return next();
};

export default verifyIsAvailable;
