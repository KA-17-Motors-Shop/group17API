import { Request, Response } from "express";
import listAnnouncementsBySellerService from "../../services/announcements/listAnnouncementBySellerId.service";

const listMyAnnouncementsController = async (req: Request, res: Response) => {
  const annoncements = await listAnnouncementsBySellerService(
    req.userId,
    req.query
  );

  return res.json(annoncements);
};

export default listMyAnnouncementsController;
