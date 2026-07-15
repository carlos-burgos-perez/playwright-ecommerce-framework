import { Page, TestInfo } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Logger } from './Logger';
export class ScreenshotManager {

    static async captureScreenshot(

        page: Page, 
        name: string

    ): Promise<void> {

        const screenshot = await page.screenshot({

            path: `screenshots/${name}.png`,
            fullPage: true,
            type: 'png'

        });

        await allure.attachment(
            name, 
            screenshot, 
            {
                contentType: 'image/png'
            }
        );
    }
}