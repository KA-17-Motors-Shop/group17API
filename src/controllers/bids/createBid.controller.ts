import { Request, Response } from "express";
import createBidService from "../../services/bids/createBid.service";

const createBidsController = async (req: Request, res: Response) => {
  const { value } = req.body;
  const { id } = req.params;
  const { userId } = req;

  await createBidService(value, id, userId);

  return res.sendStatus(200);
};

export default createBidsController;
