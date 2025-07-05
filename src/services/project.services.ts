import * as projectRepository from "../repositories/project.repositories";
import { projectRequest, projectUpdate } from "../dto/project.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";

export const createProject = async (data: projectRequest, userId: string) => {
    if (!userId) {
        throw new AppError(HttpResponse.UNAUTHORIZED);
    }
    data.ownerId = userId;
    return projectRepository.createProject(data);
};

export const getAllProjects = async (options: {
    ownerId: string;
}) => {
    if (!options.ownerId) {
        throw new AppError(HttpResponse.UNAUTHORIZED);
    }
    return projectRepository.getAllProjects(options);
};

export const getProjectBySlug = async (slug: string, userId: string) => {
    if (!userId) {
        throw new AppError(HttpResponse.UNAUTHORIZED);
    }
    const name = slug.replace(/-/g, " ");
    const project = await projectRepository.getProjectByName(name, userId);
    if (!project) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return project;
};

export const updateProject = async (id: string, data: projectUpdate) => {
    const project = await projectRepository.updateProject(id, data);
    if (!project) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return project;
};

export const deleteProject = async (id: string) => {
    const project = await projectRepository.deleteProject(id);
    if (!project) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return project;
};
