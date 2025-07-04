import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as userService from "../services/user.services";
import { HttpResponse } from "../utils/httpResponse";

export const createUser = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body);
        res.status(201).json(
            HttpResponse.CREATED('User created successfully', user)
        );
    }
);

export const getAllUsers = asyncHandler(
    async (req: Request, res: Response) => {
        const users = await userService.getAllUsers();
        res.status(200).json(
            HttpResponse.OK('Users retrieved successfully', users)
        );
    }
);

export const getUserById = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(
            HttpResponse.OK('User retrieved successfully', user)
        );
    }
);

export const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(
            HttpResponse.OK('User updated successfully', user)
        );
    }
);

export const deleteUser = asyncHandler(
    async (req: Request, res: Response) => {
        await userService.deleteUser(req.params.id);
        res.status(200).json(
            HttpResponse.OK('User deleted successfully')
        );
    }
);
