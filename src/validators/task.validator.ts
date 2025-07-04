import { checkSchema } from 'express-validator';

export const createTaskValidator = checkSchema({
    projectId: {
        in: ['body'],
        errorMessage: 'Project ID is required',
        isUUID: {
            errorMessage: 'Project ID must be a valid UUID',
        },
    },

    title: {
        in: ['body'],
        errorMessage: 'Title is required',
        isLength: {
            options: { min: 3 },
            errorMessage: 'Title must be at least 3 characters',
        },
        trim: true,
    },

    assigneeId: {
        in: ['body'],
        errorMessage: 'Assigned user ID is required',
        isUUID: {
            errorMessage: 'Assigned user ID must be a valid UUID',
        },
    },

    status: {
        in: ['body'],
        errorMessage: 'Status is required',
        isIn: {
            options: [['todo', 'in_progress', 'done']],
            errorMessage: 'Status must be todo, in_progress, or done',
        },
        optional: {
            options: { nullable: true },
        },
    },

    description: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Description must be a string',
        },
    },
});

export const updateTaskValidator = checkSchema({
    projectId: {
        in: ['body'],
        optional: true,
        isUUID: {
            errorMessage: 'Project ID must be a valid UUID',
        },
    },

    title: {
        in: ['body'],
        optional: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'Title must be at least 3 characters',
        },
        trim: true,
    },

    assigneeId: {
        in: ['body'],
        optional: true,
        isUUID: {
            errorMessage: 'Assigned user ID must be a valid UUID',
        },
    },

    status: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [['todo', 'in_progress', 'done']],
            errorMessage: 'Status must be todo, in_progress, or done',
        },
    },

    description: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: 'Description must be a string',
        },
    },
});
