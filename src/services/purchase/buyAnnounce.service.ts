import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const buyAnnounceService = async (
  id: string,
  value: number,
  userId: string
) => {
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    throw new AppError(404, "Anúncio não encontrado");
  }

  await prisma.announcement.update({
    where: { id },
    data: { isActive: false, status: "completed", winnerId: userId },
  });

  return await prisma.purchases.create({
    data: { announcementId: id, value, userId },
  });
};

export default buyAnnounceService;
