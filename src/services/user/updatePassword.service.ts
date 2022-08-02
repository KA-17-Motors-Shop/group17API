import { hash } from "bcryptjs";
import { prisma } from "../../prisma/client";

interface IData {
  newPassword: string;
  userId: string;
}

const updatePasswordService = async ({ newPassword, userId }: IData) => {
  const hashPassword = await hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { id: userId },
    data: { password: hashPassword },
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      phone: true,
      birhtDate: true,
      description: true,
      isSeller: true,
    },
  });

  return user;
};

export default updatePasswordService;
