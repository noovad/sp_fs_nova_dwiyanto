import { Prisma } from '@prisma/client';
import { HttpResponse } from '../utils/httpResponse';
import { extractForeignKey } from '../utils/extractForeignKey';
import appError from '../errors/app.error';

const errorHandler = (err, req, res, nex) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const foreignKeyErrorColumn = extractForeignKey(err.meta);
        const prismaErrorMap = {
            P2002: HttpResponse.CONFLICT("Unique constraint failed"),
            P2003: HttpResponse.BAD_REQUEST(`Foreign key constraint failed on the field: ${foreignKeyErrorColumn}`),
            P2025: HttpResponse.NOT_FOUND("Record not found"),
        };

        const errorResponse = prismaErrorMap[err.code] || HttpResponse.DATABASE_ERROR;

        return res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        const errorResponse = HttpResponse.BAD_REQUEST(err.message);
        return res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
    }

    if (err instanceof Prisma.PrismaClientRustPanicError) {
        const errorResponse = HttpResponse.UNEXPECTED_DATABASE_FAILURE;
        return res.status(errorResponse.status).json({
            success: false,
            error: errorResponse,
        });
    }

    if (err instanceof appError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                status: err.statusCode,
                message: err.message,
                code: err.code,
                details: err.details,
            },
        });
    }


    return res.status(500).json({
        success: false,
        error: {
            status: 500,
            message: err.message || 'An unexpected error occurred',
            code: 'INTERNAL_SERVER_ERROR',
        },
    });
};

export default errorHandler;
