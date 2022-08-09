import { Request, Response } from "express";
import deleteImageAnnouncement from "../../services/announcements/deleteImagesAnnouncements.service";
import saveImagesAnnouncementService from "../../services/announcements/saveImagesAnnouncement.service";
import updateAnnouncementService from "../../services/announcements/updateAnnouncement.service";

const updateAnnouncementController = async (req: Request, res: Response) => {
  const {
    title,
    description,
    year,
    km,
    price,
    isActive,
    type,
    typeVehicle,
    limitDate,
  } = req.body;
  const { id } = req.params;

  const updateAnnouncement = await updateAnnouncementService(
    {
      title,
      description,
      year,
      km,
      price: parseFloat(price) || undefined,
      type,
      typeVehicle,
      limitDate,
    },
    id
  );

  if (JSON.parse(JSON.stringify(req.files)).images) {
    await deleteImageAnnouncement(id);

    const images = await saveImagesAnnouncementService(req.files, id);
    return res.json({ ...updateAnnouncement, imagesUrls: images });
  }

  return res.json(updateAnnouncement);
};

export default updateAnnouncementController;
