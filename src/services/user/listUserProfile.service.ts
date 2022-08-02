import { prisma } from "../../prisma/client";

const listUserProfilteService = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      birhtDate: true,
      cpf: true,
      phone: true,
      description: true,
      isSeller: true,
    },
  });
};

export default listUserProfilteService;
