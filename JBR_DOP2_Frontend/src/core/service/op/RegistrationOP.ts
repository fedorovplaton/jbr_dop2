import {BaseOp} from '../../model/BaseOp';

export class RegistrationOP extends BaseOp<void> {
    opUrl = 'auth/registration';

    constructor(username: string, password: string) {
        super({'username': username, 'password': password});
    }
}
