import { taskRequest } from "../dto/task.dto";
import AppError from "../errors/app.error";
import * as taskRepositories from "../repositories/task.repositories";
import { HttpResponse } from "../utils/httpResponse";

export const createTaskService = async (data: taskRequest) => {
    const task = await taskRepositories.createTask(data);

    return task;
};


export const getAllTasksService = async (
    title?: string,
    projectName?: string,
) => {
    const tasks = await taskRepositories.getAllTasks({
        title,
        projectName,
    });
    return tasks;
};

export const getTaskByIdService = async (id: string) => {
    const task = await taskRepositories.getTaskById(id);
    if (!task) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return task;
}

export const updateTaskService = async (id: string, data: taskRequest) => {
    const task = await taskRepositories.updateTask(id, data);
    if (!task) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }

    return task;
}

export const deleteTaskService = async (id: string) => {
    const task = await taskRepositories.deleteTask(id);
    if (!task) {
        throw new AppError(HttpResponse.NOT_FOUND);
    }
    return task;
}