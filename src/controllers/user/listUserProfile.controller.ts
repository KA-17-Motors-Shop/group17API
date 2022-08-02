import { Request, Response } from "express";
import listUserProfilteService from "../../services/user/listUserProfile.service";

const listUserProfileController = async (req: Request, res: Response) => {
  const list = await listUserProfilteService(req.userId);

  return res.json(list);
};

export default listUserProfileController;
