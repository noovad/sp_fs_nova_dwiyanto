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
exports.deleteProject = exports.updateProject = exports.getProjectBySlug = exports.getAllProjects = exports.createProject = void 0;
const projectRepository = __importStar(require("../repositories/projectRepositories"));
const app_error_1 = __importDefault(require("../errors/app.error"));
const httpResponse_1 = require("../utils/httpResponse");
const createProject = async (data, userId) => {
    if (!userId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    data.ownerId = userId;
    return projectRepository.createProject(data);
};
exports.createProject = createProject;
const getAllProjects = async (options) => {
    if (!options.ownerId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    return projectRepository.getAllProjects(options);
};
exports.getAllProjects = getAllProjects;
const getProjectBySlug = async (slug, userId) => {
    if (!userId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    const name = slug.replace(/-/g, " ");
    const project = await projectRepository.getProjectByName(name, userId);
    if (!project) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.NOT_FOUND("Project not found"));
    }
    return project;
};
exports.getProjectBySlug = getProjectBySlug;
const updateProject = async (id, data, userId) => {
    if (!userId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    const existingProject = await projectRepository.getProjectById(id);
    if (!existingProject) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.NOT_FOUND("Project not found"));
    }
    if (existingProject.ownerId !== userId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.FORBIDDEN("Only the project owner can update this project"));
    }
    return await projectRepository.updateProject(id, data);
};
exports.updateProject = updateProject;
const deleteProject = async (id, userId) => {
    if (!userId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    const existingProject = await projectRepository.getProjectById(id);
    if (!existingProject) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.NOT_FOUND("Project not found"));
    }
    if (existingProject.ownerId !== userId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.FORBIDDEN("Only the project owner can delete this project"));
    }
    return await projectRepository.deleteProject(id);
};
exports.deleteProject = deleteProject;
