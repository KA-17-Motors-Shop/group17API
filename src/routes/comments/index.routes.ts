import { Router } from "express";

import createCommentController from "../../controllers/comments/createComment.controller";
import deleteCommentController from "../../controllers/comments/deleteComment.controller";
import listCommentToAnnounceController from "../../controllers/comments/listCommentToAnnounce.controller";
import updateCommentController from "../../controllers/comments/updateComment.controller";
import verifyIsUuid from "../../middlewares/verifyIsUuid.middleware";

import ensureAuth from "../../middlewares/ensureAuth.middleware";
import verifyIsOwnerComment from "../../middlewares/comments/verifyIsOwner";

const commentsRouter = Router();

commentsRouter.get("/:id", verifyIsUuid, listCommentToAnnounceController);

commentsRouter.use(ensureAuth);

commentsRouter.post("/:id", verifyIsUuid, createCommentController);

commentsRouter.patch(
  "/:id",
  verifyIsUuid,
  verifyIsOwnerComment,
  updateCommentController
);
commentsRouter.delete(
  "/:id",
  verifyIsUuid,
  verifyIsOwnerComment,
  deleteCommentController
);

export default commentsRouter;
