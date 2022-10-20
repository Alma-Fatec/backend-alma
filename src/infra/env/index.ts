const nodeEnv = process.env.NODE_ENV || 'development';

export const baseUrl =
    nodeEnv == 'development' ? `http://localhost:${process.env.PORT}` : '';
