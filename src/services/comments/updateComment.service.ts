import { prisma } from "../../prisma/client";

const updateCommentService = async (comment: string, id: string) => {
  return await prisma.comments.update({
    where: { id },
    data: { comment },
  });
};

export default updateCommentService;
