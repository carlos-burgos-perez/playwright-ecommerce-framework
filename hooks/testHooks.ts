import { test } from '../fixtures/baseTest';

import { Logger } from '../utils/Logger';
import { ScreenshotManager } from '../utils/ScreenshotManager';

test.beforeEach(async ({}, testInfo) => {
    
    Logger.info(`Starting test: ${testInfo.title}`);

});

test.afterEach(async ({ page }, testInfo) => {

    await ScreenshotManager.captureScreenshot(page, testInfo);
    
    Logger.success(`Finished successfully test: ${testInfo.title}`);

});