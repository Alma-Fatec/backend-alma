import { Body, Post, Route, Tags } from 'tsoa';
import { CreateSessionService } from '../services/session/CreateSessionService';

interface LoginInfo {
    email: string;
    password: string;
}

@Route('session')
@Tags('Session')
export class SessionController {
    @Post('/login')
    async handle(@Body() body: LoginInfo) {
        const { email, password } = body;

        const sessionService = new CreateSessionService();
        const result = await sessionService.execute({ email, password });

        return result;
    }
}
