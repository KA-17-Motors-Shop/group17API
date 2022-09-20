import { prisma } from "../../prisma/client";

const listBidsToUserService = async (userId: string) => {
  return await prisma.bids.findMany({
    where: { userId },
    select: {
      date: true,
      id: true,
      topBid: true,
      value: true,
      announcement: { select: { id: true, title: true, limitDate: true } },
    },
  });
};

export default listBidsToUserService;
