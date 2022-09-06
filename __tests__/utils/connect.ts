import { beforeEach, beforeAll, afterAll } from "@jest/globals";
import { prisma } from "../../src/prisma/client";
import { clearDatabase } from "./clearDatabase";

export function connectDatabase() {
  beforeAll(async () => {
    await prisma.$connect();
    await clearDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });
}
