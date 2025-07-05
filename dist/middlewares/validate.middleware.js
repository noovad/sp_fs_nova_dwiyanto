"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
exports.validate = validate;
