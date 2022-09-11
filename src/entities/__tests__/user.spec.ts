import { User } from '../user';

describe('User', () => {
    it('should create a user', async () => {
        const user = new User({
            name: 'Test',
            socialName: 'Test',
            cpf: '123.456.789-10',
            phone: '12345678910',
            email: 'ryan.lucas@alma.com',
            password: '1515115444',
            isActive: true,
            role: 'Student',
        });
        expect(user).toBeTruthy();
    });
});
