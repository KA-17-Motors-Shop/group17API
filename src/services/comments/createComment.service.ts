import { prisma } from "../../prisma/client";

const createCommentService = async (
  comment: string,
  id: string,
  userId: string
) => {
  return await prisma.comments.create({
    data: { comment, announcementId: id, userId },
  });
};

export default createCommentService;
