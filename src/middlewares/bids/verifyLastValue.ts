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

  const [bids] = await prisma.bids.findMany({
    where: { announcementId: id, topBid: true },
  });

  if (!bids) {
    const announce = await prisma.announcement.findUnique({ where: { id } });

    if (value < announce.price) {
      throw new AppError(409, `O valor mínimo do anúncio é ${announce.price}`);
    }

    return next();
  }

  if (value <= bids.value) {
    throw new AppError(
      409,
      `O valor do lance deve ser maior que ${bids.value}`
    );
  }

  return next();
};

export default verifyLastValues;
