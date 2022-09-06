import request from "supertest";
import { Express } from "express";
import { ICreateUser } from "src/interfaces/user";
import { ICreateAddress } from "src/interfaces/address";

export class UserRequests {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  async createUser(userData: ICreateUser, addressData: ICreateAddress) {
    const response = await request(this.app)
      .post("/users/signup")
      .send({ ...userData, ...addressData });
    return { response };
  }

  async createUserError(
    userData: ICreateUser,
    userTwoData: ICreateUser | {},
    addressData: ICreateAddress
  ) {
    await this.createUser(userData, addressData);
    const response = await request(this.app)
      .post("/users/signup")
      .send({ ...userTwoData, ...addressData });
    return { response };
  }

  async loginUser(userData: ICreateUser, addressData: ICreateAddress) {
    await this.createUser(userData, addressData);

    const response = await request(this.app)
      .post("/users/signin")
      .send({ email: userData.email, password: userData.password });
    return { response };
  }

  async loginUserError(userData: ICreateUser, addressData: ICreateAddress) {
    await this.createUser(userData, addressData);

    const response = await request(this.app)
      .post("/users/signin")
      .send({ email: userData.email, password: "wrong" });
    return { response };
  }

  async listUser(userData: ICreateUser, addressData: ICreateAddress) {
    const login = await this.loginUser(userData, addressData);
    const { token } = login.response.body;

    const response = await request(this.app)
      .get("users/me")
      .set("Authorization", `Bearer ${token}`);

    return { response, token };
  }

  async listUserError() {
    const response = await request(this.app)
      .get("users/me")
      .set("Authorization", `Bearer wrongToken`);

    return { response };
  }
}
