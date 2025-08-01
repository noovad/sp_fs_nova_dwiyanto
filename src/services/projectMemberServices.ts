import * as projectMemberRepository from "../repositories/projectMemberRepositories";
import { projectMemberRequest, projectMemberRequestByEmail } from "../dto/projectMember.dto";
import AppError from "../errors/app.error";
import { HttpResponse } from "../utils/httpResponse";
import { getUserByEmail } from "../repositories/userRepositories";
import { getProjectById } from "../repositories/projectRepositories";

export const createProjectMember = async (data: projectMemberRequestByEmail, requesterId: string) => {
    const project = await getProjectById(data.projectId);
    if (!project) {
        throw new AppError(HttpResponse.NOT_FOUND("Project not found"));
    }

    if (project.ownerId !== requesterId) {
        throw new AppError(HttpResponse.FORBIDDEN("Only the project owner can add members"));
    }

    const user = await getUserByEmail(data.email);
    if (!user) {
        throw new AppError(HttpResponse.NOT_FOUND("User not found"));
    }

    if (user.id === project.ownerId) {
        throw new AppError(HttpResponse.CONFLICT("Project owner cannot be added as a member"));
    }

    const existingMember = await projectMemberRepository.findProjectMember(
        user.id,
        data.projectId,
    );

    if (existingMember) {
        throw new AppError(HttpResponse.CONFLICT("Member already exists in the project"));
    }

    const projectMemberData: projectMemberRequest = {
        userId: user.id,
        projectId: data.projectId,
    };

    return projectMemberRepository.createProjectMember(projectMemberData);
};

export const getAllProjectMembers = async (projectId?: string) => {
    return projectMemberRepository.getAllProjectMembers(projectId);
};

export const deleteProjectMember = async (id: string) => {
    return await projectMemberRepository.deleteProjectMember(id);
};
