import { prisma } from "../../prisma/client";

const listUserProfilteService = async (
  userId: string,
  seller: boolean = false
) => {
  if (seller) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        description: true,
        isSeller: true,
      },
    });
  }

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
      isActivate: true,
    },
  });
};

export default listUserProfilteService;
