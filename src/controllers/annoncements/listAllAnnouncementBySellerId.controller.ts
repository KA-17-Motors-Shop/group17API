import { Request, Response } from "express";
import listAnnouncementsBySellerService from "../../services/announcements/listAnnouncementBySellerId.service";

const listAllAnnouncementBySellerIdController = async (
  req: Request,
  res: Response
) => {
  const annoncements = await listAnnouncementsBySellerService(req.params.id);

  return res.json(annoncements);
};

export default listAllAnnouncementBySellerIdController;
