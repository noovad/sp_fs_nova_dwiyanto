import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpResponse } from "../utils/httpResponse";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
    userId: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            res.status(401).json(
                HttpResponse.UNAUTHORIZED
            );
            return;
        }

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json(
            HttpResponse.UNAUTHORIZED
        );
    }
};