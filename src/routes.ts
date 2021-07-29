import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
routes.post("/users", createUserController.handle);
routes.post("/auth", authenticateUserController.handle);
routes.post("/tags", ensureAdmin, createTagController.handle);
routes.post("/compliment", ensureAdmin, createComplimentController.handle);
export { routes };
