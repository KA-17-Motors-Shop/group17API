import { Request, Response } from "express";
import createUserService from "../../services/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const {
    name,
    email,
    cpf,
    phone,
    birhtDate,
    description,
    password,
    isSeller,
  } = req.body;

  const protocol = req.protocol;
  const host = req.get("host");

  const newUser = await createUserService(
    {
      name,
      email,
      cpf,
      phone,
      birhtDate,
      description,
      password,
      isSeller,
    },
    protocol,
    host
  );

  return res.status(201).json(newUser);
};

export default createUserController;
