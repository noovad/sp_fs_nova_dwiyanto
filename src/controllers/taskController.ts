import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as taskService from "../services/taskService";
import { HttpResponse } from "../utils/httpResponse";

export const createTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        const task = await taskService.createTaskService(req.body);
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
        const task = await taskService.updateTaskService(req.params.id, req.body);
        res.status(200).json(
            HttpResponse.OK('Task updated successfully', task)
        );
    }
);

export const deleteTaskController = asyncHandler(
    async (req: Request, res: Response) => {
        await taskService.deleteTaskService(req.params.id);
        res.status(200).json(
            HttpResponse.OK('Task deleted successfully')
        );
    }
);
