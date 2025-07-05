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
exports.deleteTaskService = exports.updateTaskService = exports.getAllTasksService = exports.createTaskService = void 0;
const app_error_1 = __importDefault(require("../errors/app.error"));
const projectMemberRepositories_1 = require("../repositories/projectMemberRepositories");
const projectRepositories_1 = require("../repositories/projectRepositories");
const taskRepositories = __importStar(require("../repositories/taskRepositories"));
const httpResponse_1 = require("../utils/httpResponse");
const createTaskService = async (data) => {
    const isMember = await (0, projectMemberRepositories_1.findProjectMember)(data.assigneeId, data.projectId);
    const isOwner = await (0, projectRepositories_1.checkIsOwner)(data.assigneeId, data.projectId);
    if (!isMember && !isOwner) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.FORBIDDEN("Asignee must be a member or owner of the project"));
    }
    return await taskRepositories.createTask(data);
};
exports.createTaskService = createTaskService;
const getAllTasksService = async (projectId) => {
    return await taskRepositories.getAllTasks({
        projectId,
    });
};
exports.getAllTasksService = getAllTasksService;
const updateTaskService = async (id, data) => {
    const isMember = await (0, projectMemberRepositories_1.findProjectMember)(data.assigneeId, data.projectId);
    const isOwner = await (0, projectRepositories_1.checkIsOwner)(data.assigneeId, data.projectId);
    if (!isMember && !isOwner) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.FORBIDDEN("Asignee must be a member or owner of the project"));
    }
    return await taskRepositories.updateTask(id, data);
};
exports.updateTaskService = updateTaskService;
const deleteTaskService = async (id) => {
    return await taskRepositories.deleteTask(id);
};
exports.deleteTaskService = deleteTaskService;
