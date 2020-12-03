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
import { PORT, ADDRESS } from "./config/config";

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new PageNotFoundError());
});

// error handler
app.use(function (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorInstance =
    err instanceof ExceptionBase ? err : new ServerError(err);

  console.log("Request Error", errorInstance.getMessage());

  return res.status(errorInstance.getStatus()).json(errorInstance.getMessage());
});

app.listen(PORT, () => {
  console.log(`Server running on http://${ADDRESS}:${PORT}/`);
  connectDb();
});
