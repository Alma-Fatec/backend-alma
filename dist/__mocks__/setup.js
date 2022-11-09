"use strict";
// create a jest mock to Typeorm
jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');
    return Object.assign(Object.assign({}, actual), { createConnection: jest.fn(), getConnection: jest.fn(), getCustomRepository: jest.fn(), getRepository: jest.fn() });
});
//
// create a jest mock to the database connection
jest.mock('../src/infra/database/dataSource', () => {
    return {
        AppDataSource: {
            initialize: jest.fn(),
            getRepository: jest.fn(),
        },
    };
});
//
// create a jest mock to the user repository
jest.mock('../src/repositories/user.repository', () => {
    return {
        UserRepository: jest.fn().mockImplementation(() => {
            return {
                create: jest.fn(),
                save: jest.fn(),
                findOne: jest.fn(),
                find: jest.fn(),
                update: jest.fn(),
            };
        }),
    };
});
