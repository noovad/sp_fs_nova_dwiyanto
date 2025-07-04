import { TaskStatus } from "../enum/taskStatus.enum";

export interface taskRequest {
    projectId: string;
    title: string;
    assigneeId: string;
    status: TaskStatus;
    description?: string;
}

export interface taskResponse {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    projectId: string;
    assigneeId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface taskUpdate {
    title?: string;
    description?: string;
    status?: TaskStatus;
    assigneeId?: string;
}

export interface taskSorting {
    title?: string;
    projectName?: string;
    status?: TaskStatus;
}
