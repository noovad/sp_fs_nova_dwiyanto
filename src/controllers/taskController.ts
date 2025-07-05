import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as taskService from "../services/taskService";
import { HttpResponse } from "../utils/httpResponse";
import { getIO, getSocketIdByUserId } from "../configs/socket";

export const createTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json(
                HttpResponse.UNAUTHORIZED('User not authenticated')
            );
            return;
        }
        const task = await taskService.createTaskService(req.body);
        const socketId = getSocketIdByUserId(userId);
        if (socketId) {
            getIO().except(socketId).emit("task:created", task);
        } else {
            getIO().emit("task:created", task);
        }
        res.status(201).json(
            HttpResponse.CREATED('Task created successfully', task)
        );
    }
);

export const getAllTasksController = asyncHandler(
    async (req: Request, res: Response) => {
        const projectId = req.params.id;
        const tasks = await taskService.getAllTasksService(
            projectId
        );
        res.status(200).json(
            HttpResponse.OK('Tasks retrieved successfully', tasks)
        );
    }
);

export const updateTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json(
                HttpResponse.UNAUTHORIZED('User not authenticated')
            );
            return;
        }
        const task = await taskService.updateTaskService(req.params.id, req.body);
        const socketId = getSocketIdByUserId(userId);
        if (socketId) {
            getIO().except(socketId).emit("task:updated", task);
        } else {
            getIO().emit("task:updated", task);
        }
        res.status(200).json(
            HttpResponse.OK('Task updated successfully', task)
        );
    }
);

export const deleteTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json(
                HttpResponse.UNAUTHORIZED('User not authenticated')
            );
            return;
        }
        await taskService.deleteTaskService(req.params.id);
        const socketId = getSocketIdByUserId(userId);
        if (socketId) {
            getIO().except(socketId).emit("task:deleted", { taskId: req.params.id });
        } else {
            getIO().emit("task:deleted", { taskId: req.params.id });
        }
        res.status(200).json(
            HttpResponse.OK('Task deleted successfully')
        );
    }
);
