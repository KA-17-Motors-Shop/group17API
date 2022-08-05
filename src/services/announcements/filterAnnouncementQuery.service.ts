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
            lte: ltPrice ? parseFloat(ltPrice) : undefined,
            gte: gtPrice ? parseFloat(gtPrice) : undefined,
          },
          type: { equals: type },
          typeVehicle: { equals: typeVehicle },
          year: {
            lte: ltYear ? parseInt(ltYear) : undefined,
            gte: gtrYear ? parseInt(gtrYear) : undefined,
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

export default filterAnnouncementQueryService;
