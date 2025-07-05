"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const httpResponse_1 = require("../utils/httpResponse");
const extractForeignKey_1 = require("../utils/extractForeignKey");
const app_error_1 = __importDefault(require("../errors/app.error"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const foreignKeyErrorColumn = (0, extractForeignKey_1.extractForeignKey)(err.meta);
        const prismaErrorMap = {
            P2002: httpResponse_1.HttpResponse.CONFLICT("Unique constraint failed"),
            P2003: httpResponse_1.HttpResponse.BAD_REQUEST(`Foreign key constraint failed on the field: ${foreignKeyErrorColumn}`),
            P2025: httpResponse_1.HttpResponse.NOT_FOUND("Record not found"),
        };
        const errorResponse = prismaErrorMap[err.code] || httpResponse_1.HttpResponse.DATABASE_ERROR;
        res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
        return;
    }
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        const errorResponse = httpResponse_1.HttpResponse.BAD_REQUEST(err.message);
        res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
        return;
    }
    if (err instanceof client_1.Prisma.PrismaClientRustPanicError) {
        const errorResponse = httpResponse_1.HttpResponse.UNEXPECTED_DATABASE_FAILURE;
        res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
        return;
    }
    if (err instanceof app_error_1.default) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                status: err.statusCode,
                message: err.message,
                code: err.code,
                details: err.details,
            },
        });
        return;
    }
    res.status(500).json({
        success: false,
        error: {
            status: 500,
            message: err.message || 'An unexpected error occurred',
            code: 'INTERNAL_SERVER_ERROR',
        },
    });
};
exports.default = errorHandler;
