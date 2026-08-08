import dotenv from 'dotenv';

dotenv.config();


console.log('MONGO_URI:', process.env.MONGO_URI);

function required(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',

    PORT: Number(process.env.PORT || 5000),

    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

    MONGO_URI: required('MONGO_URI'),

    JWT_SECRET: required('JWT_SECRET'),

    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};