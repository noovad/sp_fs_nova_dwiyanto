import { HttpResponse } from "../utils/httpResponse";
import AppError from "./app.error";

class NotFoundError extends AppError {
  constructor(details: any[] = [], overrideMessage?: string) {
    super(HttpResponse.NOT_FOUND(), details, overrideMessage);
  }
}

export default NotFoundError;
