import { Request, Response } from "express";
import findPurchaseAnnounceService from "../../services/purchase/findPurchaseAnnounce.service";

const findPurchaseAnnounceController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const shopping = await findPurchaseAnnounceService(id);

  return res.json(shopping);
};
export default findPurchaseAnnounceController;
