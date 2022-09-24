import { prisma } from "../../prisma/client";

const listBidsToAnnouncementService = async (id: string) => {
  return await prisma.bids.findMany({
    where: { announcementId: id },
    select: {
      announcementId: true,
      date: true,
      id: true,
      topBid: true,
      value: true,
      user: { select: { id: true, name: true, avatarColor: true } },
    },
  });
};

export default listBidsToAnnouncementService;
