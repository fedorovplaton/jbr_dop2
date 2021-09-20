import {ILoginResponse, LoginOp} from './op/LoginOp';
import {RegistrationOP} from './op/RegistrationOP';

export class AuthService {
    public static async login(username: string, password: string): Promise<ILoginResponse> {
        const loginOp = new LoginOp(username, password);

        return loginOp.execute();
    }

    public static async register(username: string, password: string): Promise<void> {
        const registrationOp = new RegistrationOP(username, password);

        return registrationOp.execute();
    }
}
