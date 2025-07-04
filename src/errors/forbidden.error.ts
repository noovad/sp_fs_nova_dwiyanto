import { HttpResponse } from "../utils/httpResponse";
import AppError from "./app.error";

class ForbiddenError extends AppError {
  constructor(details: any[] = [], overrideMessage?: string) {
    super(HttpResponse.FORBIDDEN, details, overrideMessage);
  }
}

export default ForbiddenError;
