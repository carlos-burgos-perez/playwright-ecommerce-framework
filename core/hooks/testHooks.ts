import { test } from '../fixtures/baseTest';
import { Logger } from '../../utils/Logger';
import { ScreenshotManager } from '../../utils/ScreenshotManager';
import { TraceManager } from '../../utils/TraceManager';

test.beforeEach(async ({}, testInfo) => {
    
    Logger.info(`Starting "${testInfo.title}" on ${testInfo.project.name}`);

});

test.afterEach(async ({ page }, testInfo) => {
    
    if (testInfo.status !== testInfo.expectedStatus) {
        await ScreenshotManager.captureScreenshot(page, `failure-${testInfo.title.replace(/\s+/g, '_')}`);
    }
});