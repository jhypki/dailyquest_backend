import express, { Request, Response, Express } from "express";
import request from "supertest";
import { UsersController } from "../../controllers/users-controller";

describe("UsersController", () => {
  let app: Express;
  let usersController: UsersController;

  beforeAll(() => {
    app = express();
    usersController = new UsersController();
    app.get("/users", usersController.getUsers);
  });

  it("should return 'Hello, world!'", async () => {
    const response = await request(app).get("/users");
    expect(response.text).toBe("Hello, world!");
  });
});
