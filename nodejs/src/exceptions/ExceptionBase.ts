import { ErrorRequestHandler } from "express";

interface IConstructorConfig {
  error?: ErrorRequestHandler;
}
interface IExceptionBase extends IConstructorConfig {
  status: number;
  message: string;
  getMessage: Function;
  getStatus: Function;
}

interface IRequestError {
  message: string;
  stack: string;
}

class ExceptionBase implements IExceptionBase {
  status: number;
  message: string;
  error?: any;

  constructor(
    status: number,
    message: string,
    config: IConstructorConfig = {}
  ) {
    this.status = status;
    this.message = message;
    this.error = config.error;
  }

  getMessage() {
    const baseResponse = {
      status: this.status,
      message: this.message,
    };

    if (this.error) {
      const err = (this.error as unknown) as IRequestError;
      return {
        ...baseResponse,
        error: err.message,
        stack: err.stack,
      };
    } else {
      return baseResponse;
    }
  }

  getStatus() {
    return this.status;
  }
}

export default ExceptionBase;
