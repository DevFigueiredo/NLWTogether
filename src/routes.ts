import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticate";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
routes.post("/auth", authenticateUserController.handle);
routes.post("/users", ensureAdmin, createUserController.handle);
routes.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
routes.post(
  "/compliment",
  ensureAuthenticated,
  ensureAdmin,
  createComplimentController.handle
);
export { routes };
