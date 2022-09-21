import { Request, Response } from "express";
import listAnnouncementsBySellerService from "../../services/announcements/listAnnouncementBySellerId.service";

const listAllAnnouncementBySellerIdController = async (
  req: Request,
  res: Response
) => {
  const annoncements = await listAnnouncementsBySellerService(
    req.params.id,
    req.query,
    true
  );

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

export default listAllAnnouncementBySellerIdController;
