import { describe, it, expect } from "@jest/globals";

import app from "../../src/app";
import { UserRequests } from "../utils/userRequests";

export const userRequests = new UserRequests(app);

const userData = {
  name: "Teste",
  email: "teste@email.com",
  cpf: "111.222.333-44",
  phone: "(00) 99999-0000",
  birhtDate: "01/01/2000",
  description: "",
  password: "testePassword",
  isSeller: false,
};

const userTwoData = {
  name: "Teste",
  email: "teste@email.com",
  cpf: "999.888.777-66",
  phone: "(00) 99999-0000",
  birhtDate: "01/01/2000",
  description: "",
  password: "testePassword",
  isSeller: false,
};

const addressData = {
  zipCode: "01001-000",
  state: "estado",
  city: "cidate",
  street: "rua",
  number: 123,
};

export const userTests = async () => {
  describe("Successs tests", () => {
    it("Should create a user", async () => {
      const { response } = await userRequests.createUser(userData, addressData);
      const { status, body } = response;

      expect(status).toBe(201);
      expect(body).toBeDefined();
      expect(body).toHaveProperty("user");
      expect(body).toHaveProperty("address");
      expect(body.user).not.toHaveProperty("password");
    });

    it("Should login user", async () => {
      const { response } = await userRequests.loginUser(userData, addressData);
      const { status, body } = response;

      expect(status).toBe(200);
      expect(body).toBeDefined();
      expect(body).toHaveProperty("token");
    });

    it("Should list user", async () => {
      const { response } = await userRequests.listUser(userData, addressData);
      const { status, body } = response;

      expect(status).toBe(200);
      expect(body).toBeDefined();
      expect(body.id).toBeDefined();
      expect(body.name).toBe(userData.name);
    });

    it("Should update user", async () => {});

    it("Should delete user", async () => {});
  });

  describe("Error tests", () => {
    it("Try create a user with duplicate CPF", async () => {
      const { response } = await userRequests.createUserError(
        userData,
        { ...userTwoData, cpf: userData.cpf },
        addressData
      );
      const { status, body } = response;

      expect(status).toBe(409);
      expect(body).toBeDefined();
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.message).toBe("CPF já cadastrado");
    });

    it("Try create a user with duplicate email", async () => {
      const { response } = await userRequests.createUserError(
        userData,
        { ...userTwoData, email: userData.email },
        addressData
      );
      const { status, body } = response;

      expect(status).toBe(409);
      expect(body).toBeDefined();
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.message).toBe("Email já cadastrado");
    });

    it("Try create a user without key", async () => {
      const { response } = await userRequests.createUserError(
        userData,
        {},
        addressData
      );
      const { status, body } = response;

      expect(status).toBe(400);
      expect(body).toBeDefined();
      expect(body).toHaveProperty("errors");
      expect(body.errors).toHaveProperty("body");
      expect(body.errors.body).toHaveLength(7);
    });

    it("Try login user with wrong password", async () => {
      const { response } = await userRequests.loginUserError(
        userData,
        addressData
      );
      const { status, body } = response;

      expect(status).toBe(404);
      expect(body).toBeDefined();
      expect(body).toHaveProperty("status");
      expect(body.status).toBe("error");
      expect(body.message).toBe("Email ou senha incorretos");
    });

    it("Try list user without authorization", async () => {
      const { response } = await userRequests.listUserError();
      const { status, body } = response;

      expect(status).toBe(404);
      expect(body).toBeDefined();
      expect(body.message).toBeDefined();
      expect(body.message).toBe("Não autorizado");
    });
  });
};
