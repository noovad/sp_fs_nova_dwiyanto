import { Server } from "socket.io";
let io: Server;

export const initSocket = (server: any) => {
    console.log("Initializing Socket.io");
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        const { userId, projectId } = socket.handshake.query;

        if (userId) {
            socket.join(`user:${userId}`);
        }

        if (projectId) {
            socket.join(`project:${projectId}`);
        }

        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} disconnected`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) throw new Error("Socket.io not initialized");
    return io;
};
