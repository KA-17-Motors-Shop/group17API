import { Request, Response } from "express";

import saveImagesAnnouncementService from "../../services/announcements/saveImagesAnnouncement.service";

import createAnnouncementService from "../../services/announcements/createAnnouncement.service";

const createAnnoncementController = async (req: Request, res: Response) => {
  const { userId } = req;
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

  const parseBool = (value: string) => {
    return ["true", "false"].includes(value) ? value === "true" : null;
  };

  const newAnnouncement = await createAnnouncementService(
    {
      title,
      description,
      year: parseInt(year),
      km: parseInt(km),
      price: parseFloat(price),
      isActive: parseBool(isActive),
      type,
      typeVehicle,
      limitDate,
    },
    userId
  );

  if (JSON.parse(JSON.stringify(req.files)).images) {
    const images = await saveImagesAnnouncementService(
      req.files,
      newAnnouncement.id
    );
    return res.json({ ...newAnnouncement, imagesUrls: images });
  }

  return res.json(newAnnouncement);
};

export default createAnnoncementController;
