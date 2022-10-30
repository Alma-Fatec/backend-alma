import 'reflect-metadata';

import supertest from 'supertest';
import app from '../../src';

jest.useFakeTimers();

const request = supertest(app);

jest.mock('../../src/infra/database/dataSource', () => {
    return {
        AppDataSource: {
            initialize: jest.fn(),
            getRepository: jest.fn(),
        },
    };
});




describe('User Routes', () => {
    describe('GET /users', () => {
        test('receive 401 when no token is provided', async () => {
            const response = await request.get('/users');
            expect(response.status).toBe(401);
        });
    });

    describe('POST /users', () => {
        test('receive 201 when user is created', async () => {
            const response = await request.post('/users').send({
                name: 'Leo Mei',
                socialName: 'qqq',
                cpf: '709.412.820-74',
                phone: '43996784549',
                email: 'leomei@test.com',
                password: 'test123',
            });

            expect(response.status).toBe(201);

            expect(response.body).toHaveProperty('id');

            expect(response.body).toHaveProperty('name', 'Teste');

            expect(response.body).toHaveProperty('email', '');
        });
    });
});
