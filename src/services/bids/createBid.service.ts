import { prisma } from "../../prisma/client";

const createBidService = async (value: number, id: string, userId: string) => {
  await prisma.bids.create({
    data: { value, announcementId: id, userId, date: new Date() },
  });

  return true;
};

export default createBidService;
