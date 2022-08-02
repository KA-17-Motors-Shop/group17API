import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
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
      return res.json({ status: "error" });
    }
  } else {
    const users = await prisma.user.findMany({ where: { email } });

    if (
      users.find((user: User) => email === user.email && user.id !== userId)
    ) {
      return res.json({ status: "error" });
    }
  }

  next();
};

export default verifyDuplicatedEmail;
