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
    const [bids] = await prisma.bids.findMany({
      where: { announcementId: announcement.id, topBid: true },
    });

    if (!bids) {
      return false;
    }

    await prisma.announcement.update({
      where: { id: announcement.id },
      data: { status: "completed", isActive: false, winnerId: bids.userId },
    });
    return await prisma.bids.deleteMany({
      where: { announcementId: announcement.id, topBid: false },
    });
  });
  await Promise.all(promises);

  return next();
};
export default auctionWinnerObserver;
