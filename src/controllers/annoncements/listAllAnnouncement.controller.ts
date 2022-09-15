import { Request, Response } from "express";
import listAllAnnouncementService from "../../services/announcements/listAllAnnouncement.service";

const listAllAnnouncementController = async (req: Request, res: Response) => {
  const annoncements = await listAllAnnouncementService(req.query);

  const data = annoncements.map((ele) => {
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
      seller: ele.seller,
      isActive: ele.isActive,
      status: ele.status,
      bids: ele.bids,
      imagesUrl: ele.imagesUrl.filter((item) => item),
    };
  });

  return res.json(data);
};
export default listAllAnnouncementController;
