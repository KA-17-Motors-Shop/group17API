import { Request, Response } from "express";
import listMyPurchasesService from "../../services/purchase/listMyPurchases.service";

const listMyPurchasesController = async (req: Request, res: Response) => {
  const shopping = await listMyPurchasesService(req.userId);

  return res.json(shopping);
};
export default listMyPurchasesController;
