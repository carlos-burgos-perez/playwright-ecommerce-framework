import { test } from '@playwright/test';
import { Logger } from './Logger';

export class StepHelper {

    static async run<T> (
        title: string,
        action: () => Promise<T>
    
    ): Promise<T> {
        
        Logger.info(`Starting step: ${title}`);

        return await test.step(
            title, 
            async () => {
                const result = await action();
                Logger.success(`Completed step: ${title}`);
                return result;
            }
        );
        
    }
}