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

    const task = await taskRepositories.createTask(data);
    return task;
};

export const getAllTasksService = async (
    projectId: string,
) => {
    const tasks = await taskRepositories.getAllTasks({
        projectId,
    });
    return tasks;
};

export const updateTaskService = async (id: string, data: taskRequest) => {
    const isMember = await findProjectMember(data.assigneeId, data.projectId);
    const isOwner = await checkIsOwner(data.assigneeId, data.projectId);
    if (!isMember && !isOwner) {
        throw new AppError(HttpResponse.FORBIDDEN("Asignee must be a member or owner of the project"));
    }

    const task = await taskRepositories.updateTask(id, data);
    if (!task) {
        throw new AppError(HttpResponse.NOT_FOUND("Task not found"));
    }
    return task;
}

export const deleteTaskService = async (id: string) => {
    const task = await taskRepositories.deleteTask(id);
    if (!task) {
        throw new AppError(HttpResponse.NOT_FOUND("Task not found"));
    }
    return task;
}