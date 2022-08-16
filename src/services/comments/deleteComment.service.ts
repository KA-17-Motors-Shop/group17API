import { prisma } from "../../prisma/client";

const deleteCommentService = async (id: string) => {
  return await prisma.comments.delete({
    where: { id },
  });
};

export default deleteCommentService;
