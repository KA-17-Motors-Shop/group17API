import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

const auctionFinishObserver = async (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  await prisma.announcement.updateMany({
    where: {
      status: { equals: "in_progress" },
      limitDate: { lte: new Date() },
      type: { equals: "auction" },
      isActive: { equals: true },
    },
    data: { status: "stopped", isActive: false },
  });

  return next();
};
export default auctionFinishObserver;
