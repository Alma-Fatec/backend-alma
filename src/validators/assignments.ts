import { object, string } from 'yup';

export const assignmentSchema = object({
    title: string().min(1).max(50).required('Enunciado é um campo obrigatório'),
    kind: string().min(1).max(240).required('Tipo é um campo obrigatório'),
    hidden_text: string().nullable(),
});
