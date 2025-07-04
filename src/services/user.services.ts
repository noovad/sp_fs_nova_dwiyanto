import * as userRepository from "../repositories/user.repositories";
import { userRequest, userUpdate } from "../dto/user.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";

export const createUser = async (data: userRequest) => {
    const existingUser = await userRepository.getUserByEmail(data.email);
    if (existingUser) {
        throw new AppError(HttpResponse.CONFLICT);
    }
    return userRepository.createUser(data);
};

export const getAllUsers = async () => {
    return userRepository.getAllUsers();
};

export const getUserById = async (id: string) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return user;
};

export const updateUser = async (id: string, data: userUpdate) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }

    if (data.email) {
        const existingUser = await userRepository.getUserByEmail(data.email);
        if (existingUser && existingUser.id !== id) {
            throw new AppError(HttpResponse.CONFLICT);
        }
    }

    return userRepository.updateUser(id, data);
};

export const deleteUser = async (id: string) => {
    const user = await userRepository.deleteUser(id);
    if (!user) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return user;
};
