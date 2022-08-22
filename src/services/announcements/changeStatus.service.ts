import { prisma } from "../../prisma/client";

const changeStatusService = async (id: string) => {
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  const date = new Date().setHours(new Date().getHours() + 5);
  const limitDate =
    announcement.type === "auction" && !announcement.isActive
      ? new Date(date)
      : undefined;

  if (announcement.isActive) {
    await prisma.bids.deleteMany({ where: { announcementId: id } });
  }

  const status = !announcement.isActive ? "in_progress" : "stopped";

  await prisma.announcement.update({
    where: { id },
    data: { isActive: !announcement.isActive, limitDate, status },
  });
};

export default changeStatusService;
