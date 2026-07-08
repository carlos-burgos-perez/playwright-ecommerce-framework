import * as fs from 'fs';
import * as path from 'path';
import { TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Logger } from './Logger';

export class TraceManager {

    static async saveTrace(testInfo: TestInfo) {

        if (testInfo.status !== testInfo.expectedStatus) {
            return;
        }

        const tracePath = path.join(process.cwd(), 'test-results', `${testInfo.title.replace(/\s+/g, '_')}.zip`);
        Logger.info(`Trace available for "${testInfo.title}".`);

        if (fs.existsSync(tracePath)) {
            await allure.attachment('Trace', fs.readFileSync(tracePath), 'application/zip');
        } else {
            Logger.warning(`Trace file not found at ${tracePath}`);
        }
    }
}