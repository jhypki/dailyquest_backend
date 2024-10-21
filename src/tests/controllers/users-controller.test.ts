import express, { Request, Response, Express } from "express";
import request from "supertest";
import usersController from "../../controllers/users-controller";

describe("UsersController", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.get("/users", usersController.getAllUsers);
    });

    it("should return 'Hello, world!'", async () => {
        const response = await request(app).get("/users");
        expect(response.text).toBe("Hello, world!");
    });
});
