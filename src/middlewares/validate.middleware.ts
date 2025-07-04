import { validationResult } from 'express-validator';

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: extractedErrors,
      },
    });
  }
  next();
};
