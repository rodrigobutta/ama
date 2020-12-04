import * as express from "express";
import * as multer from "multer";
import multerConfig from "./config/multer";

import { createPointSchema } from './validation/schemas/pointSchema';
import validate from './validation/middlewares/validateMiddleware';

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

// routes.post(
//   "/points",
//   upload.single("image"),
//   celebrate(
//     {
//       body: Joi.object().keys({
//         name: Joi.string().required(),
//         email: Joi.string().required().email(),
//         whatsapp: Joi.number().required(),
//         latitude: Joi.number().required(),
//         longitude: Joi.number().required(),
//         city: Joi.string().required(),
//         uf: Joi.string().required().max(2),
//         items: Joi.string().required(),
//       }),
//     },
//     {
//       abortEarly: false,
//       messages: {
//         'string.empty': '{#label} cant be empty!',
//         'any.required': '{#label} is a required field for this operation'
//     }
//     }
//   ),
//   pointsController.create
// );

// Validation using Joi custom middleware
routes.post(
  '/points', 
  validate(createPointSchema), 
  pointsController.create
);

// Validation using celebrate middleware library
// router.post('/products3', celebrate({body: createProductSchema}), (req, res, next) => {
//   let payload = req.body
//   res.send({status: 'success', payload})
// })

// routes.post(
//   "/points",
//   upload.single("image"),
//   celebrate(
//     {
//       body: Joi.object().keys({
//         name: Joi.string().required(),
//         email: Joi.string().required().email(),
//         whatsapp: Joi.number().required(),
//         latitude: Joi.number().required(),
//         longitude: Joi.number().required(),
//         city: Joi.string().required(),
//         uf: Joi.string().required().max(2),
//         items: Joi.string().required(),
//       }),
//     },
//     {
//       abortEarly: false,
//       messages: {
//         'string.empty': '{#label} cant be empty!',
//         'any.required': '{#label} is a required field for this operation'
//     }
//     }
//   ),
//   pointsController.create
// );


export default routes;
