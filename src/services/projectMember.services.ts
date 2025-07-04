import * as projectMemberRepository from "../repositories/projectMember.repositories";
import * as userRepository from "../repositories/user.repositories";
import * as projectRepository from "../repositories/project.repositories";
import { projectMemberRequest } from "../dto/projectMember.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";

export const createProjectMember = async (data: projectMemberRequest) => {
    const existingMember = await projectMemberRepository.findProjectMember(
        data.userId,
        data.projectId
    );
    if (existingMember) {
        throw new AppError(HttpResponse.CONFLICT);
    }

    return projectMemberRepository.createProjectMember(data);
};

export const getAllProjectMembers = async (projectId?: string) => {
    return projectMemberRepository.getAllProjectMembers(projectId);
};

export const getProjectMemberById = async (id: string) => {
    const member = await projectMemberRepository.getProjectMemberById(id);
    if (!member) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return member;
};

export const deleteProjectMember = async (id: string) => {
    const member = await projectMemberRepository.deleteProjectMember(id);
    if (!member) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return member;
};
