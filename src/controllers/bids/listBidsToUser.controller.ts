import { Request, Response } from "express";
import listBidsToUserService from "../../services/bids/listBidsToUser.service";

const listBidsToUserController = async (req: Request, res: Response) => {
  const { userId } = req;
  const userBids = await listBidsToUserService(userId);

  return res.status(200).json(userBids);
};

export default listBidsToUserController;
