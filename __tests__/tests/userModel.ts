import { describe, it } from "@jest/globals";
import app from "../../src/app";
import { UserRequests } from "../utils/userRequests";

export const userRequests = new UserRequests(app);

export const userTests = async () => {
  describe("User routes", () => {});
};
