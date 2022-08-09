import { Request, Response } from "express";
import changeStatusService from "../../services/announcements/changeStatus.service";

const changeStatusController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await changeStatusService(id);

  return res.sendStatus(200);
};

export default changeStatusController;
