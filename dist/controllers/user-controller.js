"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserController = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.post("/", (req, res) => {
        res.send("User created successfully");
    });
};
exports.UserController = UserController;
