import { prisma } from "../../prisma/client";

const listCommentToAnnounceService = async (id: string) => {
  return await prisma.comments.findMany({ where: { announcementId: id } });
};

export default listCommentToAnnounceService;
