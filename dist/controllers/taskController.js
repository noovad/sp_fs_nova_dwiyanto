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
exports.deleteTaskController = exports.updateTaskController = exports.getAllTasksController = exports.createTaskController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const taskService = __importStar(require("../services/taskService"));
const httpResponse_1 = require("../utils/httpResponse");
const socket_1 = require("../configs/socket");
exports.createTaskController = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    const task = await taskService.createTaskService(req.body);
    const socketId = (0, socket_1.getSocketIdByUserId)(userId);
    if (socketId) {
        (0, socket_1.getIO)().except(socketId).emit("task:created", task);
    }
    else {
        (0, socket_1.getIO)().emit("task:created", task);
    }
    res.status(201).json(httpResponse_1.HttpResponse.CREATED('Task created successfully', task));
});
exports.getAllTasksController = (0, express_async_handler_1.default)(async (req, res) => {
    const projectId = req.params.id;
    const tasks = await taskService.getAllTasksService(projectId);
    res.status(200).json(httpResponse_1.HttpResponse.OK('Tasks retrieved successfully', tasks));
});
exports.updateTaskController = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    const task = await taskService.updateTaskService(req.params.id, req.body);
    const socketId = (0, socket_1.getSocketIdByUserId)(userId);
    if (socketId) {
        (0, socket_1.getIO)().except(socketId).emit("task:updated", task);
    }
    else {
        (0, socket_1.getIO)().emit("task:updated", task);
    }
    res.status(200).json(httpResponse_1.HttpResponse.OK('Task updated successfully', task));
});
exports.deleteTaskController = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    await taskService.deleteTaskService(req.params.id);
    const socketId = (0, socket_1.getSocketIdByUserId)(userId);
    if (socketId) {
        (0, socket_1.getIO)().except(socketId).emit("task:deleted", { taskId: req.params.id });
    }
    else {
        (0, socket_1.getIO)().emit("task:deleted", { taskId: req.params.id });
    }
    res.status(200).json(httpResponse_1.HttpResponse.OK('Task deleted successfully'));
});
