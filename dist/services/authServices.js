"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const userRepository = __importStar(require("../repositories/userRepositories"));
const app_error_1 = __importDefault(require("../errors/app.error"));
const httpResponse_1 = require("../utils/httpResponse");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d");
const register = async (data) => {
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    const user = await userRepository.createUser({
        email: data.email.toLowerCase(),
        password: hashedPassword,
    });
    const signOptions = { expiresIn: JWT_EXPIRES_IN };
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, signOptions);
    return {
        user: {
            id: user.id,
            email: user.email,
        },
        accessToken,
    };
};
exports.register = register;
const login = async (data) => {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.UNAUTHORIZED("Invalid email or password"));
    }
    const isPasswordValid = await bcrypt_1.default.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.UNAUTHORIZED("Invalid email or password"));
    }
    const signOptions = { expiresIn: JWT_EXPIRES_IN };
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, signOptions);
    return {
        user: {
            id: user.id,
            email: user.email,
        },
        accessToken,
    };
};
exports.login = login;
