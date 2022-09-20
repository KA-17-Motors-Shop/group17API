import { prisma } from "../../prisma/client";

const createBidService = async (value: number, id: string, userId: string) => {
  await prisma.bids.updateMany({
    where: { announcementId: id },
    data: { topBid: false },
  });

  await prisma.bids.deleteMany({ where: { announcementId: id, userId } });

  await prisma.bids.create({
    data: { value, announcementId: id, userId, date: new Date() },
  });

  return true;
};

export default createBidService;
