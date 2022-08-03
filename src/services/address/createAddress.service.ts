import { ICreateAddress } from "../../interfaces/address";
import { prisma } from "../../prisma/client";

const createAddressService = async (
  { zipCode, state, city, street, number, complement }: ICreateAddress,
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
    },
  });

  return newAddress;
};

export default createAddressService;
