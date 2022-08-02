import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyDuplicatedEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const { userId } = req;

  if (!userId) {
    const verify = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (verify) {
      throw new AppError(409, "Email already exists");
    }
  } else {
    const users = await prisma.user.findMany({ where: { email } });

    if (
      users.find((user: User) => email === user.email && user.id !== userId)
    ) {
      throw new AppError(409, "Email already exists");
    }
  }

  next();
};

export default verifyDuplicatedEmail;
