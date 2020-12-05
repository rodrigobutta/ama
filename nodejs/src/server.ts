import * as express from "express";
import { Application } from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import { errorHandler, routeNotFoundHandler } from "./middlewares/errorHandler";
import connectDb from "./models/connection";
import routes from "./routes";
import { PORT, HOST } from "./config/config";
// import * as bodyParser from 'body-parser';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.use(routeNotFoundHandler);
app.use(errorHandler);

// body parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}/`);
  connectDb();
});
