import { Request, Response } from 'express';
import { CreateSessionService } from '../services/session/CreateSessionService';

export class SessionController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const sessionService = new CreateSessionService();
        const result = await sessionService.execute({ email, password });

        if (result instanceof Error) {
            return response.status(400).json({ error: result.message });
        }
        return response.json(result);
    }
}
