import { test } from '../fixtures/baseTest';

import { Logger } from '../utils/Logger';

test.beforeEach(async ({}, testInfo) => {
    
    Logger.info(`Starting test: ${testInfo.title}`);

});

test.afterEach(async ({ page }, testInfo) => {

    Logger.success(`Finished successfully test: ${testInfo.title}`);

});