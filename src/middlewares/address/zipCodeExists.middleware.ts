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
      console.log(res.data);
      const { erro } = res.data;

      if (!erro) {
        return next();
      }

      throw new AppError(404, "Zip code not found");
    })
    .catch((err) => {
      console.log(err);
      throw new AppError(404, "Zip code not found");
    });
};

export default zipCodeExists;
