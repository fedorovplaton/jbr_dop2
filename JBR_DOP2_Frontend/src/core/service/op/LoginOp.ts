import {BaseOp} from '../../model/BaseOp';

export interface ILoginResponse {
    token: string;
    message?: string;
}

export class LoginOp extends BaseOp<ILoginResponse> {
    opUrl = 'auth/login';

    constructor(username: string, password: string) {
        super({username, password});
    }
}
