import { prisma } from "../../prisma/client";

const listBidsToUserService = async (userId: string) => {
  return await prisma.bids.findMany({ where: { userId } });
};

export default listBidsToUserService;
