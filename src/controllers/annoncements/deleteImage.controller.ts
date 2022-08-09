import { Request, Response } from "express";
import deleteOneImagesAnnouncement from "../../services/announcements/deleteOneImage.service";

const deleteImageController = async (req: Request, res: Response) => {
  const { fileName } = req.params;

  await deleteOneImagesAnnouncement(fileName);

  return res.sendStatus(204);
};

export default deleteImageController;
