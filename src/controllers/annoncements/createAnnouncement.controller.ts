import { Request, Response } from "express";

import saveImagesAnnouncementService from "../../services/announcements/saveImagesAnnouncement.service";

import createAnnouncementService from "../../services/announcements/createAnnouncement.service";

const createAnnoncementController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { title, description, year, km, price, isActive, type, typeVehicle } =
    req.body;

  const parseBool = (value: string) => {
    return ["true", "false"].includes(value) ? value === "true" : null;
  };

  const newAnnouncement = await createAnnouncementService(
    {
      title: title.toLowerCase(),
      description,
      year,
      km: parseInt(km).toString(),
      price: parseFloat(price),
      isActive: parseBool(isActive),
      type,
      typeVehicle,
    },
    userId
  );

  if (JSON.parse(JSON.stringify(req.files)).images) {
    await saveImagesAnnouncementService(req.files, newAnnouncement.id);
  }

  return res.json(newAnnouncement);
};

export default createAnnoncementController;
