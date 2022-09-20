import { prisma } from "../../prisma/client";

const findPurchaseAnnounceService = async (id: string) => {
  return await prisma.purchases.findUnique({
    where: { announcementId: id },
    select: {
      id: true,
      date: true,
      value: true,
      user: { select: { id: true, name: true } },
    },
  });
};

export default findPurchaseAnnounceService;
