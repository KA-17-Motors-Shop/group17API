import { Request, Response } from "express";
import recoveryPasswordService from "../../services/user/recoveryPassword.service";

const recoveryPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const recovery = await recoveryPasswordService({ email });

  return res.json(recovery);
};
export default recoveryPasswordController;
