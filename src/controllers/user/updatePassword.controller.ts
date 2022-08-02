import { Request, Response } from "express";
import updatePasswordService from "../../services/user/updatePassword.service";

const updatePasswordController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { newPassword } = req.body;

  await updatePasswordService({ newPassword, userId });

  return res.json({ status: "succsess" });
};

export default updatePasswordController;
