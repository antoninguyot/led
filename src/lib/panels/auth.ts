export interface User {
    name: string;
    identifier: string;
    avatarUrl: string;
}

export abstract class UserProvider {
    abstract isAuthenticated(): boolean;
    abstract user(): Promise<User>;
    abstract logout(): Promise<void>;
    abstract profileUrl(): string;
    abstract loginUrl(): string;
}