import AppError from "../../errors/appError";
import { IUpdateAddress } from "../../interfaces/address";
import { prisma } from "../../prisma/client";

const updateAddressService = async (
  { city, complement, number, state, street, zipCode }: IUpdateAddress,
  id: string,
  userId: string
) => {
  const [address] = await prisma.address.findMany({ where: { id, userId } });

  if (!address) {
    throw new AppError(404, "Not found");
  }

  const data = {
    city: city ? city : address.city,
    complement: complement ? complement : address.complement,
    number: number ? number : address.number,
    state: state ? state : address.state,
    street: street ? street : address.street,
    zipCode: zipCode ? zipCode : address.zipCode,
  };

  return await prisma.address.update({ where: { id }, data });
};

export default updateAddressService;
