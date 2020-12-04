import ExceptionBase from "./ExceptionBase";
import { CelebrateError } from "celebrate";
// import { ValidationError } from "@hapi/joi";
// import Joi = require("@hapi/joi");

class ContractError extends ExceptionBase {
  error?: CelebrateError;

  constructor(error?: CelebrateError) {
    super(422, "Contract error");

    // let res = '';
    // error.details.forEach((value) => (res += ', ' + value.message));      

    // Object.keys(error.details).map((value) => (res += ', ' + value.message));      
    // console.log('VAL ERROR 11111', res);
    this.error = error;
  }

  getMessage() {
    if (this.error) {
      const details = this.error.details;
      console.log(details.values);
      return {
        message: 'laaaaalallalalala la laaa',
      };
    } else {
      return {
        message: 'GODDDDDDD',
      };
    }
  }
}

export default ContractError;
