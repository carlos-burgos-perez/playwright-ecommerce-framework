import { User } from "../models/User";

export class UserFactory {

    private static uniqueId(): number {

        return Date.now() + Math.floor(Math.random() * 1000);

    }

    static valid(): User {

        const id = this.uniqueId();

        return {
            name: `User${id}`,
            email: `user${id}@mail.com`,
            password: `Password123`,
            firstName: `FirstName${id}`,
            lastName: `LastName${id}`,
            company: `Company${id}`,
            address: `Address${id}`,
            address2: `Address2-${id}`,
            country: `Country${id}`,
            state: `State${id}`,
            city: `City${id}`,
            zipcode: `Zipcode${id}`,
            mobileNumber: `+1234567890`
        };
    }

    static registered(): User {

        return {
            name: 'Playwright Framework',
            email: 'playwrightframework@email.com',
            password: 'JX@U@r86wMNhR2Z',
            firstName: 'Playwright',
            lastName: 'Framework',
            company: 'QA Company',
            address: 'Test Street 123',
            address2: 'Suite 1',
            country: 'United States',
            state: 'California',
            city: 'Los Angeles',
            zipcode: '90001',
            mobileNumber: '+1234567890'
        };
    }

    static invalidEmail(): User {

        return {
            ...this.valid(),
            email: 'invalid-email'
        };

    }

    static empty(): User {

        return {
            name: '',
            email: '',
            password: ''
        };

    }

    static shortPassword(): User {

        return {
            ...this.valid(),
            password: '123'
        };

    }
}