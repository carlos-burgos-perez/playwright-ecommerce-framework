import { mkdirSync } from 'fs';
import { test as setup } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { Environment } from '../config/Environment';
import { UserFactory } from '../factories/UserFactory';

const registeredUser = UserFactory.registered();

const normalizeEnvValue = (value: string | undefined, fallback: string) => {
    const trimmedValue = value?.trim();

    if (!trimmedValue) {
        return fallback;
    }

    const placeholderValues = ['your-email@test.com', 'your-email', 'your-password'];

    return placeholderValues.includes(trimmedValue.toLowerCase()) ? fallback : trimmedValue;
};

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    mkdirSync('playwright/.auth', { recursive: true });

    const email = normalizeEnvValue(Environment.validEmail, registeredUser.email);
    const password = normalizeEnvValue(Environment.validPassword, registeredUser.password);

    await loginPage.open();

    try {
        await page.locator('button:has-text("Consent")').click({ timeout: 2000 });
    } catch {
        // The cookie banner may not be present.
    }

    await loginPage.login(email, password);

    await page.waitForSelector('text=Logged in as', { timeout: 20000 });
    await page.waitForURL('**/', { timeout: 20000 });

    await page.context().storageState({ path: 'playwright/.auth/user.json' });
});