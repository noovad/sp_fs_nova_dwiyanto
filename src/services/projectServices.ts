import * as projectRepository from "../repositories/projectRepositories";
import { projectRequest, projectUpdate } from "../dto/project.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";

export const createProject = async (data: projectRequest, userId: string) => {
    if (!userId) {
        throw new AppError(HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    data.ownerId = userId;
    return projectRepository.createProject(data);
};

export const getAllProjects = async (options: {
    ownerId: string;
}) => {
    if (!options.ownerId) {
        throw new AppError(HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    return projectRepository.getAllProjects(options);
};

export const getProjectBySlug = async (slug: string, userId: string) => {
    if (!userId) {
        throw new AppError(HttpResponse.UNAUTHORIZED("User authentication required"));
    }
    const name = slug.replace(/-/g, " ");
    const project = await projectRepository.getProjectByName(name, userId);
    if (!project) {
        throw new AppError(HttpResponse.NOT_FOUND("Project not found"));
    }
    return project;
};

export const updateProject = async (id: string, data: projectUpdate, userId: string) => {
    if (!userId) {
        throw new AppError(HttpResponse.UNAUTHORIZED("User authentication required"));
    }

    const existingProject = await projectRepository.getProjectById(id);
    if (!existingProject) {
        throw new AppError(HttpResponse.NOT_FOUND("Project not found"));
    }

    if (existingProject.ownerId !== userId) {
        throw new AppError(HttpResponse.FORBIDDEN("Only the project owner can update this project"));
    }

    const project = await projectRepository.updateProject(id, data);
    return project;
};

export const deleteProject = async (id: string, userId: string) => {
    if (!userId) {
        throw new AppError(HttpResponse.UNAUTHORIZED("User authentication required"));
    }

    const existingProject = await projectRepository.getProjectById(id);
    if (!existingProject) {
        throw new AppError(HttpResponse.NOT_FOUND("Project not found"));
    }

    if (existingProject.ownerId !== userId) {
        throw new AppError(HttpResponse.FORBIDDEN("Only the project owner can delete this project"));
    }

    const project = await projectRepository.deleteProject(id);
    return project;
};
