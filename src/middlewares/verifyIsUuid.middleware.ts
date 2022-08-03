import { NextFunction, Request, Response } from "express";
import { UUIDv4 } from "uuid-v4-validator";
import AppError from "../errors/appError";

const verifyIsUuid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (UUIDv4.validate(id)) {
    return next();
  }
  throw new AppError(400, "Id format is invalid");
};
export default verifyIsUuid;
