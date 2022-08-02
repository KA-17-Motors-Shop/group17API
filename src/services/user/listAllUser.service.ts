import { prisma } from "../../prisma/client";

const listAllUsersSerice = async () => {
  return await prisma.user.findMany({
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

export default listAllUsersSerice;
