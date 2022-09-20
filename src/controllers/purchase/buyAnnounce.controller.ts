import { Request, Response } from "express";
import buyAnnounceService from "../../services/purchase/buyAnnounce.service";

const buyAnnounceController = async (req: Request, res: Response) => {
  const { value } = req.body;
  const { id } = req.params;
  const { userId } = req;

  await buyAnnounceService(id, value, userId);

  return res.status(200).json({ message: "Compra realizada com sucesso" });
};

export default buyAnnounceController;
