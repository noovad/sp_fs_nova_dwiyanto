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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const projectService = __importStar(require("../services/projectServices"));
const httpResponse_1 = require("../utils/httpResponse");
exports.createProject = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    const project = await projectService.createProject(req.body, userId);
    res.status(201).json(httpResponse_1.HttpResponse.CREATED('Project created successfully', project));
});
exports.getAllProjects = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    const projects = await projectService.getAllProjects({
        ownerId: userId,
    });
    res.status(200).json(httpResponse_1.HttpResponse.OK('Projects retrieved successfully', projects));
});
exports.getProjectBySlug = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    const project = await projectService.getProjectBySlug(req.params.slug, userId);
    res.status(200).json(httpResponse_1.HttpResponse.OK('Project retrieved successfully', project));
});
exports.updateProject = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    const project = await projectService.updateProject(req.params.id, req.body, userId);
    res.status(200).json(httpResponse_1.HttpResponse.OK('Project updated successfully', project));
});
exports.deleteProject = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        res.status(401).json(httpResponse_1.HttpResponse.UNAUTHORIZED('User not authenticated'));
        return;
    }
    await projectService.deleteProject(req.params.id, userId);
    res.status(200).json(httpResponse_1.HttpResponse.OK('Project deleted successfully'));
});
