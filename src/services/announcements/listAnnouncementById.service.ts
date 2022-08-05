import { prisma } from "../../prisma/client";
import S3Storage from "../../utils/s3Storage";

const listAnnouncementsByIdService = async (id: string) => {
  const announcements = await prisma.announcement.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      year: true,
      km: true,
      price: true,
      type: true,
      typeVehicle: true,
      publishedData: true,
      limitDate: true,
      sellerId: true,
      images: { select: { fileName: true } },
    },
  });
  const s3Storage = new S3Storage();
  const data = {
    id: announcements.id,
    title: announcements.title,
    description: announcements.description,
    year: announcements.year,
    km: announcements.km,
    price: announcements.price,
    type: announcements.type,
    typeVehicle: announcements.typeVehicle,
    publishedData: announcements.publishedData,
    limitDate: announcements.limitDate,
    sellerId: announcements.sellerId,
    imagesUrl: announcements.images.map((img) => {
      return s3Storage.getFile(img.fileName);
    }),
  };

  return data;
};

export default listAnnouncementsByIdService;
