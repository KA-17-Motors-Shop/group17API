import { prisma } from "../../src/prisma/client";

export async function clearDatabase() {
  return await prisma.$executeRaw`
        TRUNCATE   
            user,
            address,
            announcement,
            images,
            bids,
            comments;
    `;
}
