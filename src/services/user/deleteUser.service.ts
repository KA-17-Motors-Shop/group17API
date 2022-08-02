import { prisma } from "../../prisma/client";

const deleteUserService = async (userId: string) => {
  await prisma.user.delete({ where: { id: userId } });

  return true;
};

export default deleteUserService;
