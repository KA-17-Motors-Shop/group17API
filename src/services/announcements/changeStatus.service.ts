import { prisma } from "../../prisma/client";

const changeStatusService = async (id: string) => {
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  await prisma.announcement.update({
    where: { id },
    data: { isActive: !announcement.isActive },
  });
};

export default changeStatusService;
