import {AccessOp} from './op/AccessOp';

export class AccessService {
    public static getAccess(accessUrl: string): Promise<void> {
        const accessOp = new AccessOp(accessUrl);

        return accessOp.execute();
    }
}
