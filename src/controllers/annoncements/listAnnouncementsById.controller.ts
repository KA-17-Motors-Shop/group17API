import { Request, Response } from "express";
import listAnnouncementsByIdService from "../../services/announcements/listAnnouncementById.service";

const listAnnouncementByIdController = async (req: Request, res: Response) => {
  const annoncements = await listAnnouncementsByIdService(req.params.id);

  return res.json(annoncements);
};

export default listAnnouncementByIdController;
