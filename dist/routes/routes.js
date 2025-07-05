"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerRoutes;
const taskRoute_1 = __importDefault(require("./taskRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const projectRoute_1 = __importDefault(require("./projectRoute"));
const projectMemberRoute_1 = __importDefault(require("./projectMemberRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
function registerRoutes(app) {
    app.get("/", (_, res) => {
        res.status(200).send("Server is healthy");
    });
    app.use('/', authRoute_1.default);
    app.use('/', taskRoute_1.default);
    app.use('/', userRoute_1.default);
    app.use('/', projectRoute_1.default);
    app.use('/', projectMemberRoute_1.default);
    app.use((req, res) => {
        res.status(404).json({
            message: `Cannot find ${req.originalUrl} on this server`,
        });
    });
}
