import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUser = new AuthenticateUserController();

routes.post("/users", createUserController.handle);
routes.post("/auth", authenticateUser.handle);
routes.post("/tags", ensureAdmin, createTagController.handle);
export { routes };
