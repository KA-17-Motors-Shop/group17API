import { IUpdateUser } from "../../interfaces/user";
import { prisma } from "../../prisma/client";

const updateUserService = async (
  userId: string,
  { name, email, phone, birhtDate, cpf, description }: IUpdateUser
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  const data = {
    name: name ? name : user.name,
    email: email ? email : user.email,
    phone: phone ? phone : user.phone,
    birhtDate: birhtDate ? new Date(birhtDate) : user.birhtDate,
    cpf: cpf ? cpf : user.cpf,
    description: description ? description : user.description,
  };

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      birhtDate: true,
      cpf: true,
      description: true,
      isSeller: true,
    },
  });

  return updatedUser;
};

export default updateUserService;
