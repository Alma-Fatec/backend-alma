import { object, string } from 'yup';

export const classesSchema = object({
    name: string().min(1).max(50).required('Nome da aula é obrigatório'),
    description: string().min(1).max(240),
    cover: string().nullable(),
});
