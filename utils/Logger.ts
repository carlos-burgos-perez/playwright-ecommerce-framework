import * as allure from 'allure-js-commons';

export class Logger {

    private static timestamp() {
        return new Date().toISOString();
    }

    private static attach(level: string, message: string) {
        try {
            allure.attachment(`Log - ${level}`, message, 'text/plain');
        } catch (e) {
            // ignore allure attachment errors
        }
    }

    static info(message: string) {
        const formatted = `[${this.timestamp()}] [INFO] ${message}`;
        console.log(formatted);
        this.attach('INFO', message);
        return message;
    }

    static success(message: string) {
        const formatted = `[${this.timestamp()}] [SUCCESS] ${message}`;
        console.log(formatted);
        this.attach('SUCCESS', message);
        return message;
    }

    static warning(message: string) {
        const formatted = `[${this.timestamp()}] [WARNING] ${message}`;
        console.log(formatted);
        this.attach('WARNING', message);
        return message;
    }

    static error(message: string) {
        const formatted = `[${this.timestamp()}] [ERROR] ${message}`;
        console.error(formatted);
        this.attach('ERROR', message);
        return message;
    }
}