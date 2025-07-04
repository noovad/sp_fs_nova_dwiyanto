import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as authService from "../services/auth.services";
import { HttpResponse } from "../utils/httpResponse";

export const register = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await authService.register(req.body);
        res.status(201).json(
            HttpResponse.CREATED('User registered successfully', result)
        );
    }
);

export const login = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await authService.login(req.body);
        res.status(200).json(
            HttpResponse.OK('Login successful', result)
        );
    }
);
