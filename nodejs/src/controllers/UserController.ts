import { NextFunction, Request, Response } from "express";
import ResourceAlreadyExistsError from "../exceptions/ResourceAlreadyExistsError";
import { User } from "../models/User";

class UserController {
  async index(request: Request, response: Response, next: NextFunction) {
    User.find()
      .then((users) => {
        return response.json(users);
      })
      .catch((err) => {
        next(err);
      });
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { username, password } = request.body;

    User.find(
      {
        username,
      },
      (err, users) => {
        if (err) {
          next(err);
        }

        if (users.length > 0) {
          return next(new ResourceAlreadyExistsError());
        }

        const user = new User({
          username,
          password,
        });

        user
          .save()
          .then(() => {
            return response.status(201).json({
              status: "Created",
              _id: user._id,
            });
          })
          .catch((err) => {
            return next(err);
          });
      }
    );
  }
}

export default UserController;
