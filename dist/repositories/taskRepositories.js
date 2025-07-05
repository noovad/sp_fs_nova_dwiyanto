"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const prismaClient_1 = __importDefault(require("../configs/prismaClient"));
const createTask = async (data) => {
    return prismaClient_1.default.task.create({
        data,
        include: {
            assignee: {
                select: {
                    id: true,
                    email: true,
                },
            },
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};
exports.createTask = createTask;
const getAllTasks = async (options) => {
    const { projectId, } = options;
    return prismaClient_1.default.task.findMany({
        where: {
            projectId,
        },
        include: {
            assignee: {
                select: {
                    id: true,
                    email: true,
                },
            },
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};
exports.getAllTasks = getAllTasks;
const updateTask = async (id, data) => {
    return prismaClient_1.default.task.update({
        where: {
            id,
        },
        data,
        include: {
            assignee: {
                select: {
                    id: true,
                    email: true,
                },
            },
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};
exports.updateTask = updateTask;
const deleteTask = async (id) => {
    return prismaClient_1.default.task.delete({
        where: {
            id,
        },
    });
};
exports.deleteTask = deleteTask;
