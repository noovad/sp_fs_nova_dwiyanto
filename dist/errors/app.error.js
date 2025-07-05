"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    statusCode;
    code;
    details;
    isOperational;
    constructor(response, details = [], overrideMessage) {
        super(overrideMessage || response.message);
        this.statusCode = response.status;
        this.code = response.code;
        this.details = details;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
