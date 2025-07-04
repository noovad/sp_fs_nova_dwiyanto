import prisma from "../configs/prismaClient";
import { userRequest, userUpdate } from "../dto/user.dto";

export const createUser = async (data: userRequest) => {
    return prisma.user.create({
        data,
    });
};

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const updateUser = async (id: string, data: userUpdate) => {
    return prisma.user.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteUser = async (id: string) => {
    return prisma.user.delete({
        where: {
            id,
        },
    });
};
