import { Request, Response } from "express";
import listAllUsersSerice from "../../services/user/listAllUser.service";

const listAllUsersController = async (req: Request, res: Response) => {
  const list = await listAllUsersSerice();

  return res.json(list);
};

export default listAllUsersController;
