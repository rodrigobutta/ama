import Joi = require("joi");
import ExceptionBase from "./ExceptionBase";

class ContractError extends ExceptionBase {
  error?: any;

  constructor(error?: any) {
    super(422, "Contract error");
    this.error = error;
  }

  getMessage() {
    return {
      message: this.error,
    };
  }
}

export default ContractError;
