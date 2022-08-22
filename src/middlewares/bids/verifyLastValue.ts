import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const verifyLastValues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { value } = req.body;

  const bids = await prisma.bids.findMany({ where: { announcementId: id } });

  if (!bids.length) {
    const announce = await prisma.announcement.findUnique({ where: { id } });

    if (value < announce.price) {
      throw new AppError(409, `O valor mínimo do anúncio é ${announce.price}`);
    }

    return next();
  }

  let winner = bids[0];
  bids.forEach((bid) => {
    winner = winner.value < bid.value ? bid : winner;
  });

  if (!winner) {
    return next();
  }

  if (value <= winner.value) {
    throw new AppError(
      409,
      `O valor do lance deve ser maior que ${winner.value}`
    );
  }

  return next();
};

export default verifyLastValues;
