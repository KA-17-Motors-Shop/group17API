import { IUpdateAnnouncement } from "../../interfaces/announcements";
import { prisma } from "../../prisma/client";

const updateAnnouncementService = async (
  {
    description,
    km,
    price,
    title,
    type,
    typeVehicle,
    year,
  }: IUpdateAnnouncement,
  id: string
) => {
  const annoncement = await prisma.announcement.findUnique({ where: { id } });

  const data = {
    description: description ? description : annoncement.description,
    km: km ? parseInt(km).toString() : annoncement.km,
    price: price ? price : annoncement.price,
    title: title ? title : annoncement.title,
    type: type ? type : annoncement.type,
    typeVehicle: typeVehicle ? typeVehicle : annoncement.typeVehicle,
    year: year ? year : annoncement.year,
  };

  return await prisma.announcement.update({ where: { id }, data });
};

export default updateAnnouncementService;
