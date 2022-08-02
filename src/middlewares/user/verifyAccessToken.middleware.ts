import { NextFunction, Request, Response } from "express";
import { prisma } from "src/prisma/client";

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.params;

  const [user] = await prisma.user.findMany({ where: { accessToken } });

  if (!user) {
    return res.json({ status: "error" });
  }

  req.userId = user.id;

  return next();
};

export default verifyAccessToken;
