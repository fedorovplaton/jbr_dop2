import {BaseOp} from '../../model/BaseOp';

export class AccessOp extends BaseOp<void> {
    opUrl = '';

    constructor(accessUrl: string) {
        super();

        this.opUrl = accessUrl;
    }
}
