import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";

const auctionWinnerObserver = async (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  const dataBids = await prisma.announcement.findMany({
    where: {
      status: { equals: "in_progress" },
      limitDate: { lte: new Date() },
      type: { equals: "auction" },
      isActive: { equals: true },
    },
  });
  const promises = dataBids.map(async (announcement) => {
    const bids = await prisma.bids.findMany({
      where: { announcementId: announcement.id },
    });

    if (!bids) {
      return false;
    }

    let winner = bids[0];
    bids.forEach((bid) => {
      winner = winner.value < bid.value ? bid : winner;
    });

    if (!winner) {
      return false;
    }

    return await prisma.announcement.update({
      where: { id: announcement.id },
      data: { status: "completed", isActive: false, winnerId: winner.userId },
    });
  });
  await Promise.all(promises);

  return next();
};
export default auctionWinnerObserver;
