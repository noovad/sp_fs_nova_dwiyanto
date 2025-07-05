import * as userRepository from "../repositories/userRepositories";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";

export const getAllUsers = async () => {
    return userRepository.getAllUsers();
};

export const getUserByEmail = async (email: string) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new AppError(HttpResponse.NOT_FOUND("User not found"));
    }
    return user;
};

export const deleteUser = async (id: string) => {
    const user = await userRepository.deleteUser(id);
    if (!user) {
        throw new AppError(HttpResponse.NOT_FOUND("User not found"));
    }
    return user;
};
