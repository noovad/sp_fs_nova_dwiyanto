"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserByEmail = exports.getAllUsers = exports.createUser = void 0;
const prismaClient_1 = __importDefault(require("../configs/prismaClient"));
const createUser = async (data) => {
    return prismaClient_1.default.user.create({
        data,
    });
};
exports.createUser = createUser;
const getAllUsers = async () => {
    return prismaClient_1.default.user.findMany({
        select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
exports.getAllUsers = getAllUsers;
const getUserByEmail = async (email) => {
    return prismaClient_1.default.user.findUnique({
        where: {
            email,
        },
    });
};
exports.getUserByEmail = getUserByEmail;
const deleteUser = async (id) => {
    return prismaClient_1.default.user.delete({
        where: {
            id,
        },
    });
};
exports.deleteUser = deleteUser;
