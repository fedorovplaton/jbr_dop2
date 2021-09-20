export class TokenService {
    public static getToken(): string | null {
        return localStorage.getItem('token');
    }

    public static setToken(token: string): void {
        localStorage.setItem('token', token);
    }
}
