import { Request, Response } from "express";
import changeDefaultAddressService from "../../services/address/changeDefaultAddress.service";

const changeDefaultAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req;

  await changeDefaultAddressService(id, userId);

  return res.json({ message: "Novo endereço padrão definido" });
};

export default changeDefaultAddressController;
