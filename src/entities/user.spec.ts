// write a test to userClass

import { User } from './user';
import { Roles } from './roles';

describe('User', () => {
    it('should create a user', () => {
        const user = User.create({
            name: 'Test',
            socialName: 'Test',
            cpf: '12345678910',
            phone: '12345678910',
            email: 'ryan.lucas@alma.com',
            password: '1515115444',
            isActive: true,
            role: 'Student',
        });
        expect(user).toBeTruthy();
    });

    // write a test to create a user with invalid email and expect to throw an error
    it('should not create a user with invalid email', () => {
        expect(() => {
            User.create({
                name: 'Test',
                socialName: 'Test',
                cpf: '12345678910',
                phone: '12345678910',
                email: 'ryan.lucasalma.com',
                password: '1515115444',
                isActive: true,
                role: 'Student',
            });
        }).toThrow();
    });
});
