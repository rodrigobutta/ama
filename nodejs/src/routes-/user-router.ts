import { Router } from "express";
import { User } from "../models/User";
import ResourceAlreadyExistsError from "../exceptions/ResourceAlreadyExistsError";

const userRouter = Router();

userRouter.get("/", async (req, res, next) => {
  User.find()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      next(err);
    });
});

userRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;

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
          return res.status(201).json({
            status: "Created",
            _id: user._id,
          });
        })
        .catch((err) => {
          return next(err);
        });
    }
  );
});

export default userRouter;
