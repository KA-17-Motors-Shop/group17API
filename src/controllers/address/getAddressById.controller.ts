import { Request, Response } from "express";
import getAddressByIdService from "../../services/address/getAddressById.service";

const getAddressByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const address = await getAddressByIdService(id);

  return res.json(address);
};

export default getAddressByIdController;
