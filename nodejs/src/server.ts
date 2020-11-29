import * as express from "express"; 
import { Application } from 'express';
import * as cors from 'cors'

const PORT = 5000;
const HOST = '0.0.0.0';


const app: Application = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  return res.json({
    title: "It's Node JS app, written in Typescript, uses Mongo and Docker 333333",
    description: "Go to /user - to see list of users. And you can make POST request to /user with username to store new user."
  });
})


app.listen(PORT, HOST);

console.log(`Running version 3 on http://${HOST}:${PORT}`);