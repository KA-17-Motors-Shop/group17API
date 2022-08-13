import { Request, Response } from "express";
import recoveryNewCodeActivateService from "../../services/user/recoveryNewCode.service";

const recoveryNewCodeActivateController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req;

  const recovery = await recoveryNewCodeActivateService(userId);

  return res.status(200).json(recovery);
};
export default recoveryNewCodeActivateController;
