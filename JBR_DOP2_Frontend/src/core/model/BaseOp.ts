import axios, {AxiosResponse} from 'axios';
import {TokenService} from '../service/TokenService';

export interface IStringKeyMap<T> {
    [key: string]: T;
}

export abstract class BaseOp<T> {
    abstract opUrl: string;
    private readonly serverUrl = 'http://localhost:5000';
    private readonly data: IStringKeyMap<string>;

    protected constructor(data: IStringKeyMap<string> = {}) {
        this.data = data;
    }

    private getUrl = (): string => {
        return `${this.serverUrl}/${this.opUrl}`;
    }

    private getConfig = () => {
        const token = TokenService.getToken();

        if (!token) {
            return {};
        }

        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
    }

    public execute (): Promise<T> {
        const url =this.getUrl();
        const config = this.getConfig();

        return axios.post(url, this.data, config).then(
            (response: AxiosResponse<T & {token: string}>) => {
                const data = response.data;
                const token = data['token'];

                if (token) {
                    TokenService.setToken(token);
                }

                return new Promise((resolve) => resolve(data));
            }
        );
    }
}
