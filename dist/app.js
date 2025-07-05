"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const http_1 = require("http");
const socket_1 = require("./configs/socket");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
(0, socket_1.initSocket)(httpServer);
app.use((0, cors_1.default)({
    origin: process.env.FE_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, routes_1.default)(app);
app.use(errorHandler_middleware_1.default);
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
