import { HttpResponse } from "../utils/httpResponse";
import AppError from "./app.error";

class BadRequestError extends AppError {
  constructor(details: any[] = [], overrideMessage?: string) {
    super(HttpResponse.BAD_REQUEST(), details, overrideMessage);
  }
}

export default BadRequestError;
