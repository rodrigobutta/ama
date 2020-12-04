import { Router } from "express";
import multerConfig from "./config/multer";

import { createPointSchema } from "./validation/schemas/pointSchema";
import validate from "./middlewares/validateMiddleware";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import uploadMiddleware from "./middlewares/uploadMiddleware";
import UserController from "./controllers/UserController";

const routes = Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();
const userController = new UserController();

routes.get("/", (req, res) =>
  res.json({
    test: "OK",
  })
);

routes.get("/user", userController.index);
routes.post("/user", userController.create);

routes.get("/items", itemsController.index);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);
routes.post(
  "/points",
  uploadMiddleware(multerConfig),
  validate(createPointSchema),
  pointsController.create
);

export default routes;
