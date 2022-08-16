import { Request, Response } from "express";
import updateCommentService from "../../services/comments/updateComment.service";

const updateCommentController = async (req: Request, res: Response) => {
  const { comment } = req.body;
  const { id } = req.params;

  const commentDb = await updateCommentService(comment, id);

  return res.status(201).json(commentDb);
};

export default updateCommentController;
