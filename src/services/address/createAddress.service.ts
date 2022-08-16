import { ICreateAddress } from "../../interfaces/address";
import { prisma } from "../../prisma/client";

const createAddressService = async (
  {
    zipCode,
    state,
    city,
    street,
    number,
    complement,
    mainAddress,
  }: ICreateAddress,
  userId: string
) => {
  const newAddress = await prisma.address.create({
    data: {
      zipCode,
      state,
      city,
      street,
      number,
      complement,
      userId,
      mainAddress,
    },
  });

  return newAddress;
};

export default createAddressService;
