import { Request, Response } from "express";
import updateAddressService from "../../services/address/updateAddress.service";

const updateAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;
  const { city, complement, number, state, street, zipCode } = req.body;

  const newAddress = await updateAddressService(
    { city, complement, number, state, street, zipCode },
    id,
    userId
  );

  return res.json(newAddress);
};

export default updateAddressController;
