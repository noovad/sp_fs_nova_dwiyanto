export const HttpResponse = {
    /**
     * Success Responses
     */
    OK: (customMessage?: string, data?: JSON) => ({
        status: 200,
        message: customMessage || "OK",
        code: "OK",
        data: data
    }),
    CREATED: (customMessage?: string, data?: JSON) => ({
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
    CONFLICT: {
        status: 409,
        message: "Conflict",
        code: "CONFLICT",
    },
    UNAUTHORIZED: {
        status: 401,
        message: "Unauthorized",
        code: "UNAUTHORIZED",
    },
    FORBIDDEN: {
        status: 403,
        message: "Forbidden",
        code: "FORBIDDEN",
    },
    NOT_FOUND: {
        status: 404,
        message: "Not Found",
        code: "NOT_FOUND",
    },

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
