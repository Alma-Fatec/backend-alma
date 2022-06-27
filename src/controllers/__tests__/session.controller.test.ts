import { SessionController } from '../session.controller';

describe('SessionController', () => {
    describe('perform Login', () => {
        test('should return a error message', async () => {
            const controller = new SessionController();
            const loginInfo = await controller.handle({
                email: '',
                password: '',
            });

            expect(loginInfo).toStrictEqual(Error('Esse usuário não existe.'));
        });
    });
});
