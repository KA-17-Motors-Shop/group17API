import { hash } from "bcryptjs";
import { prisma } from "../../prisma/client";

interface IData {
  newPassword: string;
  userId: string;
}

const updatePasswordService = async ({ newPassword, userId }: IData) => {
  const hashPassword = await hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashPassword, accessToken: null },
  });

  return true;
};

export default updatePasswordService;
