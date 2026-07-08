import { Page, TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Logger } from './Logger';

export class ScreenshotManager {

    static async captureScreenshot(page: Page, testInfo: TestInfo) {

        if (testInfo.status !== testInfo.expectedStatus) {
            return;
        }

        try {
            await allure.attachment('Screenshot', await page.screenshot(), 'image/png');
        }
        catch {
            Logger.warning('Unable to capture screenshot');
        }
    }
}