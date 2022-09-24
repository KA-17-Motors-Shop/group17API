import { prisma } from "../../prisma/client";

const listCommentToAnnounceService = async (id: string) => {
  return await prisma.comments.findMany({
    where: { announcementId: id },
    select: {
      announcementId: true,
      user: { select: { id: true, name: true, avatarColor: true } },
      comment: true,
      id: true,
      publishedData: true,
    },
  });
};

export default listCommentToAnnounceService;
