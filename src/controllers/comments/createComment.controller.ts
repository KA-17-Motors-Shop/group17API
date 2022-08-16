import { Request, Response } from "express";
import createCommentService from "../../services/comments/createComment.service";

const createCommentController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { comment } = req.body;
  const { id } = req.params;

  const commentDb = await createCommentService(comment, id, userId);

  return res.status(201).json(commentDb);
};

export default createCommentController;
