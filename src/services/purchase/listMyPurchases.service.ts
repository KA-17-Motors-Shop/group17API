import { prisma } from "../../prisma/client";

const listMyPurchasesService = async (userId: string) => {
  return await prisma.purchases.findMany({
    where: { userId },
    select: {
      id: true,
      date: true,
      value: true,
      announcement: { select: { id: true, title: true } },
    },
  });
};

export default listMyPurchasesService;
