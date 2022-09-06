import { describe, beforeAll, beforeEach, afterAll } from "@jest/globals";
import { userTests } from "./tests/userModel";
import { clearDatabase } from "./utils/clearDatabase";
import { connectDatabase } from "./utils/connect";
import { prisma } from "../src/prisma/client";

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

describe("Routers Tests \n", () => {
  userTests();
});
