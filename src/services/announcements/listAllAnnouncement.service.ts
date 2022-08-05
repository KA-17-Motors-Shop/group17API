import { prisma } from "../../prisma/client";
import S3Storage from "../../utils/s3Storage";

const listAllAnnouncementService = async () => {
  const announcements = await prisma.announcement.findMany({
    where: { isActive: true },
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
  const data = announcements.map((ele) => {
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
      imagesUrl: ele.images.map((img) => {
        return s3Storage.getFile(img.fileName);
      }),
    };
  });

  return data;
};

export default listAllAnnouncementService;
