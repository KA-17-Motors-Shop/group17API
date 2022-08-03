import { prisma } from "../../prisma/client";

const listMyAddressService = async (userId: string) => {
  return await prisma.address.findMany({ where: { userId } });
};

export default listMyAddressService;
