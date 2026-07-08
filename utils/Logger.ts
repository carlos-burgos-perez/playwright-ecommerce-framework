export class Logger {

    private static timestamp() {
        return new Date().toISOString();
    }

    static info(message: string) {

        console.log(`[${this.timestamp()}] [INFO] ${message}`);
    }

    static success(message: string) {

        console.log(`[${this.timestamp()}] [SUCCESS] ${message}`);

    }

    static warning(message: string) {

        console.log(`[${this.timestamp()}] [WARNING] ${message}`);
    
    }

    static error(message: string) {

        console.error(`[${this.timestamp()}] [ERROR] ${message}`);

    }

}