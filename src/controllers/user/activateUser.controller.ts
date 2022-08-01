import { Request, Response } from "express";
import activateUserService from "../../services/user/activateUser.service";

const activateUserController = async (req: Request, res: Response) => {
  const { accessToken } = req.params;

  const activate = await activateUserService({
    accessToken: accessToken.toLocaleLowerCase(),
  });

  return res.json(activate);
};

export default activateUserController;
