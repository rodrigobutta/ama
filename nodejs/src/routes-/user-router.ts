import { Router } from 'express'
import { User } from '../models/User';
import ResourceAlreadyExistsError from '../exceptions/ResourceAlreadyExistsError';
import ServerError from '../exceptions/ServerError';

const userRouter = Router();



userRouter.get('/', async (req, res, next) => {
  User.find()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      next(err);
    })
})

userRouter.post('/', async (req, res, next) => {
  console.log('POST', req.body);
  const { username } = req.body;

  User.find({
    username
  }, (err, users) => {
    if (err) { next(err); }

    if (users.length > 0) {
      return next(new ResourceAlreadyExistsError);
    }

    const user = new User({
      username,
    })

    user.save()
      .then(() => {
        return res.status(201).json({
          status: "Created",
          _id: user._id
        })
      })
      .catch((err) => {
        console.log('NEXT ERRRRR');
        return next(err);
      })
  })

})


export default userRouter;