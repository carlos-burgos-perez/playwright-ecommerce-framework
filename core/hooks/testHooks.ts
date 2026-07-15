import { test } from '../fixtures/baseTest';
import { Logger } from '../../utils/Logger';
import { ScreenshotManager } from '../../utils/ScreenshotManager';
import { TraceManager } from '../../utils/TraceManager';

test.beforeEach(async (_, testInfo) => {
    Logger.info(`Starting "${testInfo.title}" on ${testInfo.project.name}`);

});

test.afterEach(async ({ page }, testInfo) => {
    if (page) {
        await ScreenshotManager.captureScreenshot(page, testInfo);
    }

    await TraceManager.saveTrace(testInfo);
});