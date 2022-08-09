import { prisma } from "../../prisma/client";
import S3Storage from "../../utils/s3Storage";

const deleteImagesAnnouncement = async (id: string) => {
  const s3Storage = new S3Storage();

  const images = await prisma.images.findMany({
    where: { announcementId: id },
  });

  const promises = images.map(async (img) => {
    await s3Storage.deleteFile(img.fileName);
  });
  await prisma.images.deleteMany({ where: { announcementId: id } });

  await Promise.all(promises);
};

export default deleteImagesAnnouncement;
