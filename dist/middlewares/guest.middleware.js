"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpResponse_1 = require("../utils/httpResponse");
const JWT_SECRET = process.env.JWT_SECRET;
const guestMiddleware = async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            next();
            return;
        }
        try {
            if (!JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }
            jsonwebtoken_1.default.verify(token, JWT_SECRET);
            res.status(403).json(httpResponse_1.HttpResponse.FORBIDDEN("Already logged in"));
            return;
        }
        catch (error) {
            next();
        }
    }
    catch (error) {
        next();
    }
};
exports.guestMiddleware = guestMiddleware;
