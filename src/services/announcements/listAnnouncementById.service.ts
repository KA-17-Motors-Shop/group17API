import AppError from "../../errors/appError";
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
      bids: true,
      isActive: true,
      status: true,
      images: { select: { fileName: true } },
    },
  });

  if (!announcements) {
    throw new AppError(404, "Not Founded");
  }

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
    bids: announcements.bids,
    isActive: announcements.isActive,
    status: announcements.status,
    imagesUrl: await Promise.all(
      announcements.images.map(async (img) => {
        return await s3Storage.getFile(img.fileName);
      })
    ),
  };

  return data;
};

export default listAnnouncementsByIdService;
