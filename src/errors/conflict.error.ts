import AppError from './app.error.js';
import { HttpResponse } from "../utils/httpResponse";

class ConflictError extends AppError {
  constructor(details: any[] = [], overrideMessage?: string) {
    super(HttpResponse.CONFLICT, details, overrideMessage);
  }
}

export default ConflictError;