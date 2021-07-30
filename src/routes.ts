import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListComplimentsByUserReceivedController } from "./controllers/ListComplimentsByUserReceivedController";
import { ListComplimentsByUserSendedController } from "./controllers/ListComplimentsByUserSendedController";
import { ListTagsController } from "./controllers/ListTagsControlle.r";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticate";

const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listComplimentsByUserReceivedController =
  new ListComplimentsByUserReceivedController();
const listComplimentsByUserSendedController =
  new ListComplimentsByUserSendedController();
const listTagsController = new ListTagsController();
routes.post("/auth", authenticateUserController.handle);
routes.post("/users", ensureAdmin, createUserController.handle);
routes.get(
  "/users/compliment/received",
  ensureAuthenticated,
  listComplimentsByUserReceivedController.handle
);
routes.get(
  "/users/compliment/sended",
  ensureAuthenticated,
  listComplimentsByUserSendedController.handle
);
routes.get("/tags", ensureAuthenticated, listTagsController.handle);
routes.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

routes.post(
  "/compliment",
  ensureAuthenticated,
  createComplimentController.handle
);
export { routes };
