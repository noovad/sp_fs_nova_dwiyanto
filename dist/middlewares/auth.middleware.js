"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpResponse_1 = require("../utils/httpResponse");
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = async (req, res, next) => {
    try {
        let token;
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED);
            return;
        }
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED);
    }
};
exports.authMiddleware = authMiddleware;
