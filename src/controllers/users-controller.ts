import { Request, Response, Express } from "express";

export const UsersController = (app: Express) => {
  app.get("/users", (req: Request, res: Response) => {
    res.send("Users route");
  });

  app.post("/users", (req: Request, res: Response) => {
    res.send("User created");
  });
};
