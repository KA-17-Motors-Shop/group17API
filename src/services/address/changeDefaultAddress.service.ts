import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const changeDefaultAddressService = async (id: string, userId: string) => {
  const address = await prisma.address.findUnique({ where: { id } });

  if (!address) {
    throw new AppError(404, "Endereço não econtrado");
  }
  if (address.userId !== userId) {
    throw new AppError(404, "Endereço não econtrado");
  }

  await prisma.address.updateMany({
    where: { userId },
    data: { mainAddress: false },
  });
  return await prisma.address.update({
    where: { id },
    data: { mainAddress: true },
  });
};

export default changeDefaultAddressService;
