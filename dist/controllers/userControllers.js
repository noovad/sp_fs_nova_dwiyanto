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
exports.deleteUser = exports.getMeByEmail = exports.getAllUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userService = __importStar(require("../services/userServices"));
const httpResponse_1 = require("../utils/httpResponse");
exports.getAllUsers = (0, express_async_handler_1.default)(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(httpResponse_1.HttpResponse.OK('Users retrieved successfully', users));
});
exports.getMeByEmail = (0, express_async_handler_1.default)(async (req, res) => {
    const userEmail = req.user?.email;
    if (!userEmail) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User email not found'));
        return;
    }
    const user = await userService.getUserByEmail(userEmail);
    res.status(200).json(httpResponse_1.HttpResponse.OK('User retrieved successfully', user));
});
exports.deleteUser = (0, express_async_handler_1.default)(async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(200).json(httpResponse_1.HttpResponse.OK('User deleted successfully'));
});
