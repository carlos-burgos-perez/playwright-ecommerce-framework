import * as allure from 'allure-js-commons';

export class AllureManager {

    static async configureTest(
        options: {
            owner?: string;
            feature?: string;
            story?: string;
            severity?: 'trivial' | 'minor' | 'normal' | 'critical' | 'blocker';
            description?: string;

        }
    ) {
        if (options.owner) {
            await allure.owner(options.owner);
        }
        if (options.feature) {
            await allure.feature(options.feature);
        }
        if (options.story) {
            await allure.story(options.story);
        }
        if (options.severity) {
            await allure.severity(options.severity);
        }
        if (options.description) {
            await allure.description(options.description);
        }
    }
}