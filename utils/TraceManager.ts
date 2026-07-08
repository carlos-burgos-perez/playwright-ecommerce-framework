import { TestInfo } from '@playwright/test';
import { Logger } from './Logger';

export class TraceManager {

    static async saveTrace(testInfo: TestInfo) {

        if (testInfo.status !== testInfo.expectedStatus) {

            return;

        }

        Logger.info(`Trace available for "${testInfo.title}".`);

    }
}