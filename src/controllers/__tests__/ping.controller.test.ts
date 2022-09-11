import PingController from '../ping.controller';

test.skip('should return pong message', async () => {
    const controller = new PingController();
    const response = await controller.getMessage();
    expect(response.message).toBe('pong');
});
