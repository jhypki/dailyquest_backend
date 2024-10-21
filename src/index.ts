import express, { Express } from "express";
import dotenv from "dotenv";
import { userRoutes } from "./routes";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
