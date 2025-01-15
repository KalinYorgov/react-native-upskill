export interface User {
    username: string;
    lastname: string;
    token: string;
    password?: string;
}

export interface AccountState {
    account: {
        user: User;
        isLoggedIn: boolean;
        error: string;
    }
}