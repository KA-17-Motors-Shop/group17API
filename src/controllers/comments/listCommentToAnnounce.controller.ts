import { Request, Response } from "express";
import listCommentToAnnounceService from "../../services/comments/listCommentsToAnnounce.service";

const listCommentToAnnounceController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const commentDb = await listCommentToAnnounceService(id);

  return res.status(200).json(commentDb);
};

export default listCommentToAnnounceController;
