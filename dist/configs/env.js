"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.DATABASE_URL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
_a = process.env, exports.DATABASE_URL = _a.DATABASE_URL, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRES_IN = _a.JWT_EXPIRES_IN;
