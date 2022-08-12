import { prisma } from "../../prisma/client";

const changeStatusService = async (id: string) => {
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  const date = new Date().setHours(new Date().getHours() + 5);
  const limitDate =
    announcement.type === "auction" && !announcement.isActive
      ? new Date(date)
      : undefined;

  await prisma.announcement.update({
    where: { id },
    data: { isActive: !announcement.isActive, limitDate },
  });
};

export default changeStatusService;
