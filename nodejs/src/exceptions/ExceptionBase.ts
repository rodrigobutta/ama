import { ErrorRequestHandler } from "express";

interface IConstructorConfig {
  error?: ErrorRequestHandler;
}
interface IExceptionBase extends IConstructorConfig {
  status: number,
  message: string,
  getMessage: Function,
  getStatus: Function,
}

interface IRequestError {
  message: string,
  stack: string,
}


class ExceptionBase implements IExceptionBase {
  status: number;
  message: string;
  error?: ErrorRequestHandler;

  constructor(status: number, message: string, config: IConstructorConfig = {}) {
    this.status = status;
    this.message = message;
    this.error = config.error;
  }

  getMessage() {

    if(this.error){
      const err = this.error as unknown as IRequestError;
      return {
        message: this.message,
        error: err.message,
        stack: err.stack,      
      };        
    }
    else{
      return {
        message: this.message,      
      }
    }

  }

  getStatus() {
    return this.status;
  }

}

export default ExceptionBase;