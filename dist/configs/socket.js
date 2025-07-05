"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIdByUserId = exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
let io;
const connectedUsers = new Map();
const socketIdToUserId = new Map();
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.FE_URL,
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        let userId;
        try {
            const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('token=')[1]?.split(';')[0];
            if (token) {
                if (!JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined");
                }
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                userId = decoded.userId;
            }
        }
        catch (error) {
            console.log("Failed to authenticate socket connection:", error);
        }
        if (userId) {
            connectedUsers.set(userId, socket.id);
            socketIdToUserId.set(socket.id, userId);
            console.log(`User ${userId} connected as ${socket.id}`);
        }
        else {
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
exports.initSocket = initSocket;
const getIO = () => {
    if (!io)
        throw new Error("Socket.io not initialized");
    return io;
};
exports.getIO = getIO;
const getSocketIdByUserId = (userId) => {
    return connectedUsers.get(userId);
};
exports.getSocketIdByUserId = getSocketIdByUserId;
