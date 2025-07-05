"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsOwner = exports.deleteProject = exports.updateProject = exports.getProjectByName = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const prismaClient_1 = __importDefault(require("../configs/prismaClient"));
const createProject = async (data) => {
    return prismaClient_1.default.project.create({
        data,
    });
};
exports.createProject = createProject;
const getAllProjects = async (options) => {
    const { ownerId } = options;
    return prismaClient_1.default.project.findMany({
        where: {
            OR: [
                { ownerId: ownerId },
                {
                    memberships: {
                        some: {
                            userId: ownerId,
                        },
                    },
                },
            ],
        },
        include: {
            owner: {
                select: {
                    id: true,
                    email: true,
                },
            },
            tasks: true,
        },
    });
};
exports.getAllProjects = getAllProjects;
const getProjectById = async (id) => {
    return prismaClient_1.default.project.findFirst({
        where: {
            id,
        },
    });
};
exports.getProjectById = getProjectById;
const getProjectByName = async (name, userId) => {
    return prismaClient_1.default.project.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive",
            },
            OR: [
                { ownerId: userId },
                {
                    memberships: {
                        some: {
                            userId: userId,
                        },
                    },
                },
            ],
        },
        include: {
            owner: {
                select: {
                    id: true,
                    email: true,
                },
            },
            tasks: true,
            memberships: {
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
};
exports.getProjectByName = getProjectByName;
const updateProject = async (id, data) => {
    return prismaClient_1.default.project.update({
        where: {
            id,
        },
        data,
    });
};
exports.updateProject = updateProject;
const deleteProject = async (id) => {
    return prismaClient_1.default.project.delete({
        where: {
            id,
        },
    });
};
exports.deleteProject = deleteProject;
const checkIsOwner = async (userId, projectId) => {
    const project = await prismaClient_1.default.project.findFirst({
        where: {
            id: projectId,
            ownerId: userId,
        },
        select: { id: true },
    });
    return !!project;
};
exports.checkIsOwner = checkIsOwner;
