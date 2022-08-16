import axios from "axios";
import { NextFunction, Request, Response } from "express";

import AppError from "../../errors/appError";

const zipCodeExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { zipCode } = req.body;

  if (!zipCode) {
    return next();
  }

  await axios
    .get(`http://viacep.com.br/ws/${zipCode.replace("-", "")}/json/`)
    .then((res) => {
      const { erro } = res.data;

      if (!erro) {
        return next();
      }

      throw new AppError(404, "CEP inválido");
    })
    .catch((err) => {
      console.log(err);
      throw new AppError(404, "CEP inválido");
    });
};

export default zipCodeExists;
