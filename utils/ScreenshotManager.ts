import { Page, TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Logger } from './Logger';
import * as fs from 'fs';
import * as path from 'path';

export class ScreenshotManager {

    static async captureScreenshot(
        page: Page,
        testInfo: TestInfo
    ): Promise<void> {
        try {
            const buffer = await page.screenshot({ fullPage: true });
            const name = `${testInfo.title.replace(/\s+/g, '_')}.png`;

            await allure.attachment(name, buffer, 'image/png');

            const outDir = testInfo.outputDir || path.join(process.cwd(), 'test-results');
            try {
                fs.mkdirSync(outDir, { recursive: true });
                const filePath = path.join(outDir, name);
                fs.writeFileSync(filePath, buffer);
                Logger.info(`Saved screenshot to ${filePath}`);
            } catch {
                // ignore filesystem errors
            }
        } catch (err) {
            Logger.warning(`Failed to capture screenshot: ${err}`);
        }
    }
}
