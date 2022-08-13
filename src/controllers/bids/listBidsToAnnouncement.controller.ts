import { Request, Response } from "express";
import listBidsToAnnouncementService from "../../services/bids/listBidsToAnnouncement.service";

const listBidsToAnnouncementController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const announcement = await listBidsToAnnouncementService(id);

  return res.status(200).json(announcement);
};

export default listBidsToAnnouncementController;
