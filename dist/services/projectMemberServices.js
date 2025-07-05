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
exports.deleteProjectMember = exports.getAllProjectMembers = exports.createProjectMember = void 0;
const projectMemberRepository = __importStar(require("../repositories/projectMemberRepositories"));
const app_error_1 = __importDefault(require("../errors/app.error"));
const httpResponse_1 = require("../utils/httpResponse");
const userRepositories_1 = require("../repositories/userRepositories");
const projectRepositories_1 = require("../repositories/projectRepositories");
const createProjectMember = async (data, requesterId) => {
    const project = await (0, projectRepositories_1.getProjectById)(data.projectId);
    if (!project) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.NOT_FOUND("Project not found"));
    }
    if (project.ownerId !== requesterId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.FORBIDDEN("Only the project owner can add members"));
    }
    const user = await (0, userRepositories_1.getUserByEmail)(data.email);
    if (!user) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.NOT_FOUND("User not found"));
    }
    if (user.id === project.ownerId) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.CONFLICT("Project owner cannot be added as a member"));
    }
    const existingMember = await projectMemberRepository.findProjectMember(user.id, data.projectId);
    if (existingMember) {
        throw new app_error_1.default(httpResponse_1.HttpResponse.CONFLICT("Member already exists in the project"));
    }
    const projectMemberData = {
        userId: user.id,
        projectId: data.projectId,
    };
    return projectMemberRepository.createProjectMember(projectMemberData);
};
exports.createProjectMember = createProjectMember;
const getAllProjectMembers = async (projectId) => {
    return projectMemberRepository.getAllProjectMembers(projectId);
};
exports.getAllProjectMembers = getAllProjectMembers;
const deleteProjectMember = async (id) => {
    return await projectMemberRepository.deleteProjectMember(id);
};
exports.deleteProjectMember = deleteProjectMember;
