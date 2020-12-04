import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import ContractError from "../exceptions/ContractError";

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

export default (schema: ObjectSchema) => (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(request.body, options);
  if (error) {
    const errorsDetail = error.details.map((i) => i.message);
    next(new ContractError(errorsDetail));
  } else {
    next();
  }
};
