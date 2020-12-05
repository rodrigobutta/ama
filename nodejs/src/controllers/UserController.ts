import { NextFunction, Request, Response } from "express";
import ResourceAlreadyExistsError from "../exceptions/ResourceAlreadyExistsError";
import { User } from "../models/User";

class UserController {
  async index(request: Request, response: Response, next: NextFunction) {
    User.find()
      .then((users) => {
        const serializedUsers = users.map((user: any) => {
          return {
            id: user._id,
            ...user.toJSON()
          };
        });

        return response.json(serializedUsers);
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
              id: user._id,
              status: "Created",
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
