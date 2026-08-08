import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../shared/logger/logger.js';

export async function connectDatabase(): Promise<void> {
    try {
        await mongoose.connect(env.MONGO_URI);

        logger.info('MongoDB Connected Successfully');
    } catch (error) {
        logger.error(error);

        throw error
    }
}