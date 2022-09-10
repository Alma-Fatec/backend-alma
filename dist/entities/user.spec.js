"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
describe('User', () => {
    it('should create a user', async () => {
        const user = await user_1.User.create({
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
