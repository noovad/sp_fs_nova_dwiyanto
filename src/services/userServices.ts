import * as userRepository from "../repositories/userRepositories";
import { userRequest } from "../dto/user.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";

export const createUser = async (data: userRequest) => {
    const existingUser = await userRepository.getUserByEmail(data.email);
    if (existingUser) {
        throw new AppError(HttpResponse.CONFLICT("Email already exists"));
    }
    return userRepository.createUser(data);
};

export const getAllUsers = async () => {
    return userRepository.getAllUsers();
};

export const deleteUser = async (id: string) => {
    const user = await userRepository.deleteUser(id);
    if (!user) {
        throw new AppError(HttpResponse.NOT_FOUND("User not found"));
    }
    return user;
};
