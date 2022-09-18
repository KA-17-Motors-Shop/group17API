import { Request, Response } from "express";
import loginUserService from "../../services/user/loginUser.service";

const userLoginController = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await loginUserService({ email, password });

  return response.status(200).json(user);
};

export default userLoginController;
