import express, { Request, Response, Express } from "express";
import request from "supertest";
import { UsersController } from "../../controllers/users-controller";

describe("UsersController", () => {
  let app: Express;
  beforeEach(() => {
    app = express();
    UsersController(app);
  });

  test("should respond with 'Users route' on GET /users", async () => {
    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200); // Check for success response
    expect(res.text).toBe("Users route"); // Check the response body
  });

  test("should respond with 'User created' on POST /users", async () => {
    const res = await request(app).post("/users");

    expect(res.statusCode).toBe(200); // Check for success response
    expect(res.text).toBe("User created"); // Check the response body
  });
});
