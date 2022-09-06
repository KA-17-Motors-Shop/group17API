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
}
