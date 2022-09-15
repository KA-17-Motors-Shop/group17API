import { Request, Response } from "express";
import listAnnouncementsByIdService from "../../services/announcements/listAnnouncementById.service";

const listAnnouncementByIdController = async (req: Request, res: Response) => {
  const annoncements = await listAnnouncementsByIdService(req.params.id);

  const data = annoncements.imagesUrl.filter((item) => item);

  return res.json({ ...annoncements, imagesUrl: data });
};

export default listAnnouncementByIdController;
