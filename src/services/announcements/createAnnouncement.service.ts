import { ICreateAnnouncement } from "../../interfaces/announcements";
import { prisma } from "../../prisma/client";

const createAnnouncementService = async (
  {
    description,
    isActive,
    km,
    price,
    title,
    type,
    typeVehicle,
    year,
  }: ICreateAnnouncement,
  userId: string
) => {
  const date = new Date().setHours(new Date().getHours() + 5);
  const limitDate = type === "auction" && isActive ? new Date(date) : undefined;

  const newAnnouncement = await prisma.announcement.create({
    data: {
      description,
      isActive,
      km,
      limitDate,
      price,
      title,
      type,
      typeVehicle,
      year,
      sellerId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      km: true,
      year: true,
      type: true,
      typeVehicle: true,
      isActive: true,
      limitDate: true,
      publishedData: true,
      sellerId: true,
    },
  });

  return newAnnouncement;
};

export default createAnnouncementService;
