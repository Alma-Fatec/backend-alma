import { NextFunction, Request, Response } from 'express';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

const validate =
    (schema: OptionalObjectSchema<ObjectShape>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: error });
        }
    };

export default validate;
