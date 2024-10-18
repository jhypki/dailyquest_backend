import { InitializeControllers } from "./controllers";
import express, { Express } from "express";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

InitializeControllers(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
