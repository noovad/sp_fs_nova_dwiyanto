"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = require("../utils/httpResponse");
const app_error_1 = __importDefault(require("./app.error"));
class ForbiddenError extends app_error_1.default {
    constructor(details = [], overrideMessage) {
        super(httpResponse_1.HttpResponse.FORBIDDEN(), details, overrideMessage);
    }
}
exports.default = ForbiddenError;
