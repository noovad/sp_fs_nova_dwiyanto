import * as projectRepository from "../repositories/project.repositories";
import { projectRequest, projectUpdate } from "../dto/project.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";

export const createProject = async (data: projectRequest) => {
    return projectRepository.createProject(data);
};

export const getAllProjects = async (options: {
    name?: string;
    ownerId?: string;
}) => {
    return projectRepository.getAllProjects(options);
};

export const getProjectById = async (id: string) => {
    const project = await projectRepository.getProjectById(id);
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
