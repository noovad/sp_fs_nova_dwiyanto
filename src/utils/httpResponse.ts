export const HttpResponse = {
    /**
     * Success Responses
     */
    OK: (customMessage?: string, data?: object) => ({
        status: 200,
        message: customMessage || "OK",
        code: "OK",
        data: data
    }),
    CREATED: (customMessage?: string, data?: object) => ({
        status: 201,
        message: customMessage || "Created",
        code: "CREATED",
        data: data
    }),

    /**
     * Client Error Responses
     */
    BAD_REQUEST: (customMessage?: string) => ({
        status: 400,
        message: customMessage || "Bad Request",
        code: "BAD_REQUEST",
    }),
    CONFLICT: (customMessage?: string) => ({
        status: 409,
        message: customMessage || "Data already exists.",
        code: "CONFLICT",
    }),
    UNAUTHORIZED: (customMessage?: string) => ({
        status: 401,
        message: customMessage || "Unauthorized",
        code: "UNAUTHORIZED",
    }),
    FORBIDDEN: (customMessage?: string) => ({
        status: 403,
        message: customMessage || "Forbidden",
        code: "FORBIDDEN",
    }),
    NOT_FOUND: (customMessage?: string) => ({
        status: 404,
        message: customMessage || "Not Found",
        code: "NOT_FOUND",
    }),

    /**
     * Server Error Responses
     */
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: "Internal Server Error",
        code: "INTERNAL_SERVER_ERROR",
    },
    SERVICE_UNAVAILABLE: {
        status: 503,
        message: "Service Unavailable",
        code: "SERVICE_UNAVAILABLE",
    },

    /**
     * Database Error Responses
     */
    DATABASE_ERROR: {
        status: 500,
        message: "Database Error",
        code: "DATABASE_ERROR",
    },
    UNEXPECTED_DATABASE_FAILURE: {
        status: 500,
        message: "Unexpected Database Failure",
        code: "UNEXPECTED_DATABASE_FAILURE",
    },
};
