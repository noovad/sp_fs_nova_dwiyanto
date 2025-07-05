import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as authService from "../services/authServices";
import { HttpResponse } from "../utils/httpResponse";

export const register = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await authService.register(req.body);

        res.cookie('token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: process.env.BACKEND_DOMAIN,
            path: '/'
        });

        res.status(201).json(
            HttpResponse.CREATED('User registered successfully', result.user)
        );
    }
);

export const login = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await authService.login(req.body);
        console.log('access result:', result.accessToken);
        res.cookie('token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: process.env.BACKEND_DOMAIN,
            path: '/'
        });

        res.status(200).json(
            HttpResponse.OK('Login successful', result.user)
        );
    }
);

export const logout = asyncHandler(
    async (req: Request, res: Response) => {
        res.clearCookie('token');
        res.status(200).json(
            HttpResponse.OK('Logout successful')
        );
    }
);
