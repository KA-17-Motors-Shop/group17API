import AppError from "../../errors/appError";
import { prisma } from "../../prisma/client";

const deleteAddressService = async (id: string, userId: string) => {
  const [address] = await prisma.address.findMany({ where: { id, userId } });

  if (!address) {
    throw new AppError(404, "Not found");
  }

  await prisma.address.delete({ where: { id } });
};

export default deleteAddressService;
