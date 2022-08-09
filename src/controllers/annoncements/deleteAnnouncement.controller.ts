import { Request, Response } from "express";
import deleteImageAnnouncement from "../../services/announcements/deleteImagesAnnouncements.service";
import deleteAnnouncementService from "../../services/announcements/deleteAnnouncement.service";

const deleteAnnouncementController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteImageAnnouncement(id);
  await deleteAnnouncementService(id);

  return res.sendStatus(204);
};

export default deleteAnnouncementController;
