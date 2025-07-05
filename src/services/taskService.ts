import { taskRequest } from "../dto/task.dto";
import AppError from "../errors/app.error";
import { findProjectMember } from "../repositories/projectMemberRepositories";
import { checkIsOwner } from "../repositories/projectRepositories";
import * as taskRepositories from "../repositories/taskRepositories";
import { HttpResponse } from "../utils/httpResponse";

export const createTaskService = async (data: taskRequest) => {
    const isMember = await findProjectMember(data.assigneeId, data.projectId);
    const isOwner = await checkIsOwner(data.assigneeId, data.projectId);
    if (!isMember && !isOwner) {
        throw new AppError(HttpResponse.FORBIDDEN("Asignee must be a member or owner of the project"));
    }

    return await taskRepositories.createTask(data);
};

export const getAllTasksService = async (
    projectId: string,
) => {
    return await taskRepositories.getAllTasks({
        projectId,
    });
};

export const updateTaskService = async (id: string, data: taskRequest) => {
    const isMember = await findProjectMember(data.assigneeId, data.projectId);
    const isOwner = await checkIsOwner(data.assigneeId, data.projectId);
    if (!isMember && !isOwner) {
        throw new AppError(HttpResponse.FORBIDDEN("Asignee must be a member or owner of the project"));
    }

    return await taskRepositories.updateTask(id, data);
}

export const deleteTaskService = async (id: string) => {
    return await taskRepositories.deleteTask(id);
}