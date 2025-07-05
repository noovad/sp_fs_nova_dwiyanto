import prisma from "../configs/prismaClient";
import { projectRequest, projectUpdate } from "../dto/project.dto";

export const createProject = async (data: projectRequest) => {
    return prisma.project.create({
        data,
    });
};

export const getAllProjects = async (options: { ownerId: string }) => {
    const { ownerId } = options;

    return prisma.project.findMany({
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
        },
    });
};


export const getProjectByName = async (name: string, userId: string) => {
    return prisma.project.findFirst({
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

export const updateProject = async (id: string, data: projectUpdate) => {
    return prisma.project.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteProject = async (id: string) => {
    return prisma.project.delete({
        where: {
            id,
        },
    });
};
