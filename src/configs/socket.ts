import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

let io: Server;
const connectedUsers = new Map<string, string>();
const socketIdToUserId = new Map<string, string>();

export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FE_URL,
            credentials: true,
        },
    });

    io.on("connection", (socket: Socket) => {
        let userId: string | undefined;

        try {
            const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('token=')[1]?.split(';')[0];

            if (token) {
                if (!JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined");
                }
                const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
                userId = decoded.userId;
            }
        } catch (error) {
            console.log("Failed to authenticate socket connection:", error);
        }

        if (userId) {
            connectedUsers.set(userId, socket.id);
            socketIdToUserId.set(socket.id, userId);

            console.log(`User ${userId} connected as ${socket.id}`);
        } else {
            console.log(`Unauthenticated socket ${socket.id} connected`);
        }

        socket.on("disconnect", () => {
            if (userId) {
                connectedUsers.delete(userId);
            }
            socketIdToUserId.delete(socket.id);
            console.log(`Socket ${socket.id} disconnected`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
};

export const getSocketIdByUserId = (userId: string) => {
    return connectedUsers.get(userId);
};