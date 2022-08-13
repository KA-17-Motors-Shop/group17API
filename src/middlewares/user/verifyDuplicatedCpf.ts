import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyDuplicatedCpf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf } = req.body;
  const { userId } = req;

  if (!userId) {
    const verify = await prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (verify) {
      throw new AppError(409, "CPF já cadastrado");
    }
  } else {
    const users = await prisma.user.findMany({ where: { cpf } });

    if (users.find((user: User) => cpf === user.cpf && user.id !== userId)) {
      throw new AppError(409, "CPF já cadastrado");
    }
  }

  next();
};

export default verifyDuplicatedCpf;
