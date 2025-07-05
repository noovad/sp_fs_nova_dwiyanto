"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProjectMemberByEmail = exports.findProjectMember = exports.deleteProjectMember = exports.getAllProjectMembers = exports.createProjectMember = void 0;
const prismaClient_1 = __importDefault(require("../configs/prismaClient"));
const createProjectMember = async (data) => {
    return prismaClient_1.default.membership.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });
};
exports.createProjectMember = createProjectMember;
const getAllProjectMembers = async (projectId) => {
    const where = {};
    if (projectId) {
        where.projectId = projectId;
    }
    return prismaClient_1.default.membership.findMany({
        where,
        include: {
            user: {
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
exports.getAllProjectMembers = getAllProjectMembers;
const deleteProjectMember = async (id) => {
    return prismaClient_1.default.membership.delete({
        where: {
            id,
        },
    });
};
exports.deleteProjectMember = deleteProjectMember;
const findProjectMember = async (userId, projectId) => {
    return prismaClient_1.default.membership.findFirst({
        where: {
            userId,
            projectId,
        },
    });
};
exports.findProjectMember = findProjectMember;
const findProjectMemberByEmail = async (email) => {
    return prismaClient_1.default.membership.findFirst({
        where: {
            user: {
                email,
            },
        },
        include: {
            user: {
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
exports.findProjectMemberByEmail = findProjectMemberByEmail;
