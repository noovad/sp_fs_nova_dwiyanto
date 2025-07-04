import prisma from "../configs/prismaClient";
import { projectRequest, projectUpdate } from "../dto/project.dto";

export const createProject = async (data: projectRequest) => {
    return prisma.project.create({
        data,
    });
};

export const getAllProjects = async (options: {
    name?: string;
    ownerId?: string;
}) => {
    const { name, ownerId } = options;
    const where: any = {};

    if (name) {
        where.name = {
            contains: name,
            mode: "insensitive",
        };
    }

    if (ownerId) {
        where.ownerId = ownerId;
    }

    return prisma.project.findMany({
        where,
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

export const getProjectById = async (id: string) => {
    return prisma.project.findUnique({
        where: {
            id,
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
