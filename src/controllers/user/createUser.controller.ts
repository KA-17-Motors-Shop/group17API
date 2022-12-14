import { Request, Response } from "express";
import createAddressService from "../../services/address/createAddress.service";
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
    zipCode,
    state,
    city,
    street,
    number,
    complement,
  } = req.body;

  const newUser = await createUserService({
    name,
    email,
    cpf,
    phone,
    birhtDate,
    description,
    password,
    isSeller,
  });

  const newAddress = await createAddressService(
    {
      zipCode,
      state,
      city,
      street,
      number,
      complement,
      mainAddress: true,
    },
    newUser.id
  );

  return res.status(201).json({ user: newUser, address: newAddress });
};

export default createUserController;
