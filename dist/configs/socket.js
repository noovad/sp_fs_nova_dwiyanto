"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitToProject = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const projectRooms = new Map();
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.FE_URL,
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        let projectId;
        projectId = socket.handshake.query.projectId;
        if (projectId) {
            socket.join(projectId);
            if (!projectRooms.has(projectId)) {
                projectRooms.set(projectId, new Set());
            }
            projectRooms.get(projectId).add(socket.id);
            console.log(`Socket ${socket.id} connected to project ${projectId}`);
        }
        else {
            console.log(`Unauthenticated socket ${socket.id} attempted connection`);
        }
        socket.on("disconnect", () => {
            for (const [projId, sockets] of projectRooms.entries()) {
                sockets.delete(socket.id);
                if (sockets.size === 0) {
                    projectRooms.delete(projId);
                }
            }
            console.log(`Socket ${socket.id} disconnected`);
        });
    });
    return io;
};
exports.initSocket = initSocket;
const emitToProject = (projectId, event, payload) => {
    if (!io)
        throw new Error("Socket.io not initialized");
    io.to(projectId).emit(event, payload);
};
exports.emitToProject = emitToProject;
