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
import { CelebrateError } from "celebrate";
import ContractError from "./exceptions/ContractError";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  return res.json({
    test: "OK",    
  });
});
app.use("/user", userRouter);


// error handler
app.use( (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err) {
    const errorInstance =
      err instanceof ExceptionBase
      ? err 
      : err instanceof CelebrateError
        ? new ContractError(err) 
        : new ServerError(err);

    return res.status(errorInstance.getStatus()).json(errorInstance.getMessage());
  }

  next()
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new PageNotFoundError());
});


app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}/`);
  connectDb();
});
