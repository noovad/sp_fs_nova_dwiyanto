class AppError extends Error {
  statusCode: number;
  code: string;
  details: any[];
  isOperational: boolean;

  constructor(
    response: { status: number; message: string; code: string },
    details: any[] = [],
    overrideMessage?: string
  ) {
    super(overrideMessage || response.message);
    this.statusCode = response.status;
    this.code = response.code;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
