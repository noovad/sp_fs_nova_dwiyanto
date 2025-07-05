"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = require("../utils/httpResponse");
const app_error_1 = __importDefault(require("./app.error"));
class NotFoundError extends app_error_1.default {
    constructor(details = [], overrideMessage) {
        super(httpResponse_1.HttpResponse.NOT_FOUND(), details, overrideMessage);
    }
}
exports.default = NotFoundError;
