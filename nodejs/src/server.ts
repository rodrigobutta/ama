import * as express from "express";
import {
  Application,
  Response,
  Request,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import * as cors from "cors";
import userRouter from "./routes-/user-router";
import PageNotFoundError from "./exceptions/PageNotFoundError";
import ServerError from "./exceptions/ServerError";
import ExceptionBase from "./exceptions/ExceptionBase";
import connectDb from "./models/connection";
import routes from "./routes";
import { PORT, HOST } from "./config/config";
import ContractError from "./exceptions/ContractError";
// import * as bodyParser from 'body-parser';

const app: Application = express();

app.use(cors());
app.use(express.json());

// body parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())

app.use(routes);

app.get("/", (req, res) => {
  return res.json({
    test: "OK",    
  });
});
app.use("/user", userRouter);


app.use( (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err) {
    // const errorInstance =
    //   err instanceof ExceptionBase
    //   ? err 
    //   : err instanceof CelebrateError
    //     ? new ContractError(err) 
    //     : new ServerError(err);

    const errorInstance =
      err instanceof ExceptionBase
      ? err 
      : new ServerError(err);

    return res.status(errorInstance.getStatus()).json(errorInstance.getMessage());
  }

  next()
});

// Celerate library error handler
// app.use(errors())

// Custom server error handler
// app.use(require('./middlewares/handleErrors'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new PageNotFoundError());
});


app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}/`);
  connectDb();
});
