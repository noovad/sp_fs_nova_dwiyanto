import { HttpResponse } from "../utils/httpResponse";
import AppError from "./app.error";

class UnAuthorizedError extends AppError {
  constructor(details: any[] = [], overrideMessage?: string) {
    super(HttpResponse.UNAUTHORIZED(), details, overrideMessage);
  }
}

export default UnAuthorizedError;
