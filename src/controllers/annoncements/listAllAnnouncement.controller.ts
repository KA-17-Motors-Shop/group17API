import { Request, Response } from "express";
import listAllAnnouncementService from "../../services/announcements/listAllAnnouncement.service";

const listAllAnnouncementController = async (req: Request, res: Response) => {
  const annoncements = await listAllAnnouncementService(req.query);

  return res.json(annoncements);
};
export default listAllAnnouncementController;
