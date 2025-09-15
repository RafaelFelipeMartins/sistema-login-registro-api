export interface User {
    id: string;
    nome: string;
    email: string;
    senha_hash: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUserData {
    nome: string;
    email: string;
    senha_hash: string;
}

export interface LoginData {
    email: string;
    senha_hash: string;
}

export interface UserResponse {
    id: string;
    nome: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface AuthResponse {
    user: UserResponse;
    token: string;
    expires_in: string;
}