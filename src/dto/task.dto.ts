import { TaskStatus } from "../enum/taskStatus.enum";

export interface taskRequest {
    projectId: string;
    title: string;
    assigneeId: string;
    status: TaskStatus;
    description?: string;
}

export interface taskUpdate {
    title?: string;
    description?: string;
    status?: TaskStatus;
    assigneeId?: string;
}
