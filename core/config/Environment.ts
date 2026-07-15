import dotenv from 'dotenv';

dotenv.config();

export enum EnvironmentType {
    LOCAL = 'LOCAL',
    QA = 'QA',
    PRODUCTION = 'PRODUCTION'
}
export class Environment {

    static readonly baseUrl = process.env.BASE_URL;
    static readonly defaultTimeout = Number(process.env.DEFAULT_TIMEOUT);
    static readonly validEmail = process.env.VALID_EMAIL!;
    static readonly validPassword = process.env.VALID_PASSWORD!;
}