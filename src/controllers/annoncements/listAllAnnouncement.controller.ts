import { Request, Response } from "express";
import filterAnnouncementQueryService from "../../services/announcements/filterAnnouncementQuery.service";
import listAllAnnouncementService from "../../services/announcements/listAllAnnouncement.service";

const listAllAnnouncementController = async (req: Request, res: Response) => {
  if (JSON.stringify(req.query) !== JSON.stringify({})) {
    const annoncementsFilter = await filterAnnouncementQueryService(req.query);

    return res.json(annoncementsFilter);
  }

  const annoncements = await listAllAnnouncementService();

  return res.json(annoncements);
};
export default listAllAnnouncementController;
