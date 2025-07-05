import prisma from "../configs/prismaClient";
import { projectMemberRequest } from "../dto/projectMember.dto";

export const createProjectMember = async (data: projectMemberRequest) => {
    return prisma.membership.create({
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

export const getAllProjectMembers = async (projectId?: string) => {
    const where: any = {};

    if (projectId) {
        where.projectId = projectId;
    }

    return prisma.membership.findMany({
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

export const deleteProjectMember = async (id: string) => {
    return prisma.membership.delete({
        where: {
            id,
        },
    });
};

export const findProjectMember = async (userId: string, projectId: string) => {
    return prisma.membership.findFirst({
        where: {
            userId,
            projectId,
        },
    });
};

export const findProjectMemberByEmail = async (email: string) => {
    return prisma.membership.findFirst({
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
