import { Request, Response } from "express";
import deleteCommentService from "../../services/comments/deleteComment.service";

const deleteCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteCommentService(id);

  return res.sendStatus(204);
};

export default deleteCommentController;
