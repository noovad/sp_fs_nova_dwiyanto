export interface registerRequest {
    email: string;
    password: string;
}

export interface loginRequest {
    email: string;
    password: string;
}

export interface authResponse {
    user: {
        id: string;
        email: string;
    };
    accessToken: string;
}
