import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as projectService from "../services/projectServices";
import { HttpResponse } from "../utils/httpResponse";

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const project = await projectService.createProject(req.body, userId);
        res.status(201).json(
            HttpResponse.CREATED('Project created successfully', project)
        );
    }
);

export const getAllProjects = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const projects = await projectService.getAllProjects({
            ownerId: userId,
        });
        res.status(200).json(
            HttpResponse.OK('Projects retrieved successfully', projects)
        );
    }
);

export const getProjectBySlug = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const project = await projectService.getProjectBySlug(req.params.slug, userId);
        res.status(200).json(
            HttpResponse.OK('Project retrieved successfully', project)
        );
    }
);

export const updateProject = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        const project = await projectService.updateProject(req.params.id, req.body, userId);
        res.status(200).json(
            HttpResponse.OK('Project updated successfully', project)
        );
    }
);

export const deleteProject = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.userId;
        await projectService.deleteProject(req.params.id, userId);
        res.status(200).json(
            HttpResponse.OK('Project deleted successfully')
        );
    }
);
