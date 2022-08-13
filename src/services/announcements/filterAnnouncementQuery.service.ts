import AppError from "../../errors/appError";
import { IFilterQueryParams } from "../../interfaces/announcements";
import { prisma } from "../../prisma/client";
import S3Storage from "../../utils/s3Storage";

const filterAnnouncementQueryService = async ({
  ltDataLimit,
  gtDataLimit,
  gtPrice,
  ltPrice,
  title,
  type,
  typeVehicle,
  gtrYear,
  ltYear,
}: IFilterQueryParams) => {
  const announcements = await prisma.announcement.findMany({
    where: {
      AND: [
        {
          title: { contains: title },
          limitDate: { lte: ltDataLimit, gte: gtDataLimit },
          price: {
            lte: ltPrice,
            gte: gtPrice,
          },
          type: { equals: type },
          typeVehicle: { equals: typeVehicle },
          year: {
            lte: ltYear,
            gte: gtrYear,
          },
        },
      ],
      isActive: true,
    },
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
      bids: ele.bids,
      isActive: ele.isActive,
      status: ele.status,
      imagesUrl: ele.images.map((img) => {
        return s3Storage.getFile(img.fileName);
      }),
    };
  });

  return data;
};

export default filterAnnouncementQueryService;
