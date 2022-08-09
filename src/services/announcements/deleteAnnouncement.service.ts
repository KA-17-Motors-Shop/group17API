import { prisma } from "../../prisma/client";

const deleteAnnouncementService = async (id: string) => {
  await prisma.announcement.delete({ where: { id } });

  await prisma.images.deleteMany({
    where: { announcementId: id },
  });
};

export default deleteAnnouncementService;
