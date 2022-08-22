import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";
import S3Storage from "../../utils/s3Storage";

const listAnnouncementsBySellerService = async (sellerId: string) => {
  const announcements = await prisma.announcement.findMany({
    where: { sellerId },
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
      isActive: true,
      status: true,
      bids: true,
      images: { select: { fileName: true } },
    },
  });

  if (!announcements) {
    throw new AppError(404, "Not Founded");
  }

  const s3Storage = new S3Storage();
  const data = announcements.map(async (ele) => {
    return {
      id: ele.id,
      title: ele.title,
      description: ele.description,
      year: ele.year,
      km: ele.km,
      price: ele.price,
      type: ele.type,
      typeVehicle: ele.typeVehicle,
      publishedData: ele.publishedData,
      limitDate: ele.limitDate,
      sellerId: ele.sellerId,
      bids: ele.bids,
      imagesUrl: await Promise.all(
        ele.images.map(async (img) => {
          return await s3Storage.getFile(img.fileName);
        })
      ),
    };
  });

  return await Promise.all(data);
};

export default listAnnouncementsBySellerService;
