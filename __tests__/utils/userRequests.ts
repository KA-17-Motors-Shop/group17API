import request from "supertest";
import { Express } from "express";

export class UserRequests {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }
}
