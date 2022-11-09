"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const supertest_1 = __importDefault(require("supertest"));
const src_1 = __importDefault(require("../../src"));
require("../../src/infra/database/dataSource");
jest.useFakeTimers();
const request = (0, supertest_1.default)(src_1.default);
jest.mock('../../src/infra/database/dataSource', () => {
    return {
        AppDataSource: {
            initialize: jest.fn(),
            getRepository: jest.fn(),
        },
    };
});
describe('Session Routes', () => {
    describe('POST /session/login/', () => {
        test('receive 201 when user is created', async () => {
            const response = await request.post('/session/login/').send({
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
