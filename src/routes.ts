import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

routes.post("/users", createUserController.handle);
routes.post("/tags", ensureAdmin, createTagController.handle);
export { routes };
