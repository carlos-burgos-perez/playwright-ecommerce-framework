import * as fs from 'fs';
import * as path from 'path';
import { TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Logger } from './Logger';

export class TraceManager {

    static async saveTrace(testInfo: TestInfo) {
        // Save trace only when the test did not finish with the expected status (usually failed)
        if (testInfo.status === testInfo.expectedStatus) {
            return;
        }

        Logger.info(`Trace available for "${testInfo.title}".`);

        const candidatePaths = [
            path.join(testInfo.outputDir, 'trace.zip'),
            path.join(process.cwd(), 'test-results', `${testInfo.title.replace(/\s+/g, '_')}.zip`)
        ];

        let attached = false;
        for (const tracePath of candidatePaths) {
            if (fs.existsSync(tracePath)) {
                await allure.attachment('Trace', fs.readFileSync(tracePath), 'application/zip');
                attached = true;
                break;
            }
        }

        if (!attached) {
            Logger.warning(`Trace file not found in expected locations: ${candidatePaths.join(', ')}`);
        }
    }
}