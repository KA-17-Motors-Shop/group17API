import { Request, Response } from "express";
import deleteUserService from "../../services/user/deleteUser.service";

const deleteUserController = async (request: Request, response: Response) => {
  const { userId } = request;

  await deleteUserService(userId);

  return response.sendStatus(204);
};

export default deleteUserController;
