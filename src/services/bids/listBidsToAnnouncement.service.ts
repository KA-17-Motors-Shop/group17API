import { prisma } from "../../prisma/client";

const listBidsToAnnouncementService = async (id: string) => {
  return await prisma.bids.findMany({ where: { announcementId: id } });
};

export default listBidsToAnnouncementService;
