import { Request, Response } from "express";
import deleteAddressService from "../../services/address/deleteAddress.service";

const deleteAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;

  await deleteAddressService(id, userId);

  return res.sendStatus(204);
};

export default deleteAddressController;
