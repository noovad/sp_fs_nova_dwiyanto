import { Server, Socket } from "socket.io";

let io: Server;
const projectRooms = new Map<string, Set<string>>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FE_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    let projectId: string | undefined;

    projectId = socket.handshake.query.projectId as string;

    if (projectId) {
      socket.join(projectId);

      if (!projectRooms.has(projectId)) {
        projectRooms.set(projectId, new Set());
      }
      projectRooms.get(projectId)!.add(socket.id);

      console.log(`Socket ${socket.id} connected to project ${projectId}`);
    } else {
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

export const emitToProject = (projectId: string, event: string, payload: any) => {
  if (!io) throw new Error("Socket.io not initialized");
  io.to(projectId).emit(event, payload);
};