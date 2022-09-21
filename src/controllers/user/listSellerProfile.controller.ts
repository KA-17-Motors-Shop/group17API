import { Request, Response } from "express";
import listUserProfilteService from "../../services/user/listUserProfile.service";

const listSellerProfileController = async (req: Request, res: Response) => {
  const seller = await listUserProfilteService(req.params.id);

  return res.json(seller);
};

export default listSellerProfileController;
