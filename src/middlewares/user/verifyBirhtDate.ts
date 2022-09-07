import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";

const verifyBirhtDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { birhtDate } = req.body;

  if (!birhtDate) {
    const { userId } = req;

    if (userId) {
      return next();
    } else {
      throw new AppError(400, "Data de nascimento é um campo obrigatório");
    }
  } else {
    const converDate = new Date(birhtDate);

    if (converDate) {
      const age = new Date().getFullYear() - converDate.getFullYear();

      if (age >= 18) {
        return next();
      }
      throw new AppError(409, "Precisar ter mais de 18 anos");
    }

    throw new AppError(400, "Data inválida");
  }
};

export default verifyBirhtDate;
