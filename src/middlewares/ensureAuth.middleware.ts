import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../prisma/client";

const ensureAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ status: "error" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.json({ status: "error" });
  }

  const secret = process.env.SECRET_KEY;

  verify(token, secret, (err, decoded) => {
    if (!decoded) {
      return res.json({ status: "error" });
    }
    const { userId } = <any>decoded;

    req.userId = userId;
  });

  const userExists = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!userExists) {
    return res.json({ status: "error" });
  }

  return next();
};
export default ensureAuth;
