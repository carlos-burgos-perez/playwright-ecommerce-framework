import { test } from '@playwright/test';

export class StepHelper {

    static async run (
        title: string,
        action: () => Promise<void>
    
    ) {
        
        await test.step(title, action);
        
    }
}