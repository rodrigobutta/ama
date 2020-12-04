import { NextFunction, Request, Response } from "express";
import * as multer from "multer";
import ContractError from "../exceptions/ContractError";

export default (config: any) => (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const upload = multer(config).single("image");

  upload(request, response, (err: any) => {
    // request.file contains information of uploaded file
    // request.body contains information of text fields, if there were any

    if (!request.file) {
      return next(new ContractError("Image file reuired"));
    } else if (err instanceof multer.MulterError) {
      return next(new Error(err.message));
    } else if (err) {
      return next(new Error(err));
    }

    next();
    // response.send(`File uploaded "${request.file.path}"`);
  });
};
