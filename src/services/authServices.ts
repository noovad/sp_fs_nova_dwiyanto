import * as userRepository from "../repositories/userRepositories";
import { registerRequest, loginRequest } from "../dto/auth.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN: StringValue | number = (process.env.JWT_EXPIRES_IN || "7d") as StringValue;

export const register = async (data: registerRequest) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.createUser({
        email: data.email.toLowerCase(),
        password: hashedPassword,
    });

    const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN };
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        signOptions
    );

    return {
        user: {
            id: user.id,
            email: user.email,
        },
        accessToken,
    };
};

export const login = async (data: loginRequest) => {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
        throw new AppError(HttpResponse.UNAUTHORIZED("Invalid email or password"));
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new AppError(HttpResponse.UNAUTHORIZED("Invalid email or password"));
    }

    const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN };
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        signOptions
    );

    return {
        user: {
            id: user.id,
            email: user.email,
        },
        accessToken,
    };
};