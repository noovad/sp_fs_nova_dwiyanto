import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpResponse } from "../utils/httpResponse";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
    userId: string;
    email: string;
}

export const guestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            next();
            return;
        }

        try {
            jwt.verify(token, JWT_SECRET) as JwtPayload;
            res.status(403).json(
                HttpResponse.FORBIDDEN
            );
            return;
        } catch (error) {
            next();
        }
    } catch (error) {
        next();
    }
};
