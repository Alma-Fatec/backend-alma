import { object, string } from 'yup';

export const classesBlockSchema = object().shape({
    body: object({
        description: string().min(1).max(240),
        cover: string(),
    }),
});
