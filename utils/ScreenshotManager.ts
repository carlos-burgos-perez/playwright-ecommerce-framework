import { Page, TestInfo } from '@playwright/test';
import { Logger } from './Logger';

export class ScreenshotManager {

    static async captureScreenshot(page: Page, testInfo: TestInfo) {

        if (testInfo.status !== testInfo.expectedStatus) {

            return;

        }

        const fileName = `${testInfo.project.name}_${testInfo.title.replace(/\s+/g, '_')}.png`;

        try{
            await page.screenshot({ path: `artifacts/screenshots/${testInfo.project.name}/${fileName}`, fullPage: true });
        }
        catch {
            Logger.warning('Unable to capture screenshot');
        };

    }
}