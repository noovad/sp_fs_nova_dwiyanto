import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as userService from "../services/userServices";
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

export const getMeByEmail = asyncHandler(
    async (req: Request, res: Response) => {
        const userEmail = req.user?.email;
        const user = await userService.getUserByEmail(userEmail);
        res.status(200).json(
            HttpResponse.OK('User retrieved successfully', user)
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
