export interface projectRequest {
    name: string;
    ownerId: string;
}

export interface projectResponse {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface projectUpdate {
    name?: string;
}
