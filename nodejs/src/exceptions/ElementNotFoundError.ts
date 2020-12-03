import ExceptionBase from "./ExceptionBase";

class ElementNotFoundError extends ExceptionBase {
  constructor(message: string = "Element not found") {
    super(404, message);
  }
}

export default ElementNotFoundError;
