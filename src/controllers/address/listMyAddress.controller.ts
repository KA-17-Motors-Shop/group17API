import { Request, Response } from "express";
import listMyAddressService from "../../services/address/listMyAddress.service";

const listMyAddressController = async (req: Request, res: Response) => {
  const address = await listMyAddressService(req.userId);

  return res.json(address);
};

export default listMyAddressController;
