import { Request, Response } from "express";
import updateUserService from "src/services/user/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { name, email, phone, birhtDate, cpf, description } = req.body;

  const updateUser = await updateUserService(userId, {
    name,
    email,
    phone,
    birhtDate,
    cpf,
    description,
  });

  return res.json(updateUser);
};

export default updateUserController;
