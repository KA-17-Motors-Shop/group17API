import { Request, Response } from "express";
import createAddressService from "../../services/address/createAddress.service";

const createAddressController = async (req: Request, res: Response) => {
  const { city, number, state, street, zipCode, complement } = req.body;
  const { userId } = req;

  const newAddress = await createAddressService(
    { city, number, state, street, zipCode, complement },
    userId
  );

  return res.status(201).json(newAddress);
};

export default createAddressController;
