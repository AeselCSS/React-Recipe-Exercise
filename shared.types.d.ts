interface LoginResponse {
    username: string;
    token: string;
    roles: Array<string>;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface SignUpRequest {
    username: string;
    password: string;
    email: string;
}

interface SignUpResponse {
    username: string;
    roles: string[];
    email: string;
}