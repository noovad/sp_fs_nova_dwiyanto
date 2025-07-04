import prisma from "../configs/prismaClient";
import { projectMemberRequest } from "../dto/projectMember.dto";

export const createProjectMember = async (data: projectMemberRequest) => {
    return prisma.projectMember.create({
        data,
    });
};

export const getAllProjectMembers = async (projectId?: string) => {
    const where: any = {};

    if (projectId) {
        where.projectId = projectId;
    }

    return prisma.projectMember.findMany({
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

export const getProjectMemberById = async (id: string) => {
    return prisma.projectMember.findUnique({
        where: {
            id,
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

export const deleteProjectMember = async (id: string) => {
    return prisma.projectMember.delete({
        where: {
            id,
        },
    });
};

export const findProjectMember = async (userId: string, projectId: string) => {
    return prisma.projectMember.findFirst({
        where: {
            userId,
            projectId,
        },
    });
};
