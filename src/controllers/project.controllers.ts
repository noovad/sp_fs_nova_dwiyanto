import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import * as projectService from "../services/project.services";
import { HttpResponse } from "../utils/httpResponse";

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const project = await projectService.createProject(req.body);
        res.status(201).json(
            HttpResponse.CREATED('Project created successfully', project)
        );
    }
);

export const getAllProjects = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, ownerId } = req.query;
        const projects = await projectService.getAllProjects({
            name: name as string,
            ownerId: ownerId as string,
        });
        res.status(200).json(
            HttpResponse.OK('Projects retrieved successfully', projects)
        );
    }
);

export const getProjectById = asyncHandler(
    async (req: Request, res: Response) => {
        const project = await projectService.getProjectById(req.params.id);
        res.status(200).json(
            HttpResponse.OK('Project retrieved successfully', project)
        );
    }
);

export const updateProject = asyncHandler(
    async (req: Request, res: Response) => {
        const project = await projectService.updateProject(req.params.id, req.body);
        res.status(200).json(
            HttpResponse.OK('Project updated successfully', project)
        );
    }
);

export const deleteProject = asyncHandler(
    async (req: Request, res: Response) => {
        await projectService.deleteProject(req.params.id);
        res.status(200).json(
            HttpResponse.OK('Project deleted successfully')
        );
    }
);
