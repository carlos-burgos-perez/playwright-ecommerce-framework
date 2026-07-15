import dotenv from 'dotenv';
import { EnvironmentType } from './Environment';

export class EnvironmentManager {

    static load(): void {

        const environment = process.env.TEST_ENV ?? EnvironmentType.LOCAL;

        dotenv.config({

            path: `.env.${environment}`
        
        });
    }
}