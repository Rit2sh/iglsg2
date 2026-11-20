
export interface IUser {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
}

export type ApiResponse<T = unknown> = {
    success?: boolean;
    error?: boolean;
    message: string;
    data?: T;
}

