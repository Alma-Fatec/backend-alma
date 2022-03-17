import { Request, Response } from 'express';

export class Auth {
    async handle(req: Request, res: Response) {
        //const { username, password } = req.body;

        return res.json({ token: 'ihulll' });
    }
}
