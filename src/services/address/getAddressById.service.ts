import { prisma } from "../../prisma/client";

const getAddressByIdService = async (id: string) => {
  return await prisma.address.findUnique({ where: { id } });
};

export default getAddressByIdService;
