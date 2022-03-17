import { object, string } from 'yup';

export const userSchema = object().shape({
    body: object({
        name: string().min(1).max(255),
        social_name: string(),
        cpf: string().min(14).max(14).required('CPF é um campo obrigatório'),
        phone: string().min(8).max(255),
        email: string().email().required('Email é um campo obrigatório'),
        password: string(),
    }),
});
