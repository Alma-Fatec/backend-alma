import { object, string } from 'yup';

export const classesBlockSchema = object({
    title: string().min(1).max(50).required('Título é um campo obrigatório'),
    description: string().min(1).max(240),
    cover: string(),
});
