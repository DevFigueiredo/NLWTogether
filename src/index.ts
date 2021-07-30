import "reflect-metadata";
import "./database";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";
import { errorsMiddleware } from "./middlewares/errorsMiddleware";
import cors from "cors";
const app = express();

app.use(json());
app.use(cors());
app.use(routes);
app.use(errorsMiddleware);

app.listen(3333, () => {
  console.log("server is running");
});
