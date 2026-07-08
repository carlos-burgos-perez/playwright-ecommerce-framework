import { test } from '../fixtures/baseTest';
import { Logger } from '../../utils/Logger';
import { ScreenshotManager } from '../../utils/ScreenshotManager';
import { TraceManager } from '../../utils/TraceManager';

test.beforeEach(async ({}, testInfo) => {
    
    Logger.info(`Starting "${testInfo.title}" on ${testInfo.project.name}`);

});

test.afterEach(async ({ page }, testInfo) => {

    await ScreenshotManager.captureScreenshot(page, testInfo);

    await TraceManager.saveTrace(testInfo);
    
    Logger.success(`Finished "${testInfo.title}" (${testInfo.status})`);

});