export interface userRequest {
    email: string;
    password: string;
}

export interface userResponse {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
