"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_js_1 = __importDefault(require("./app.error.js"));
const httpResponse_1 = require("../utils/httpResponse");
class ConflictError extends app_error_js_1.default {
    constructor(details = [], overrideMessage) {
        super(httpResponse_1.HttpResponse.CONFLICT(), details, overrideMessage);
    }
}
exports.default = ConflictError;
