export interface projectMemberRequest {
    userId: string;
    projectId: string;
}

export interface projectMemberResponse {
    id: string;
    userId: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}
