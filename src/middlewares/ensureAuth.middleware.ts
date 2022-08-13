import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/appError";
import { prisma } from "../prisma/client";

const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, "Não autorizado");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(401, "Não autorizado");
  }

  const secret = process.env.SECRET_KEY;

  verify(token, secret, (err, decoded) => {
    if (!decoded) {
      throw new AppError(401, "Não autorizado");
    }
    const { userId } = <any>decoded;

    req.userId = userId;
  });

  const userExists = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!userExists) {
    throw new AppError(401, "Não autorizado");
  }

  return next();
};
export default ensureAuth;
