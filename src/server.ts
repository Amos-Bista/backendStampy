import http from 'http';

// import app from './app.ts';

import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';

import logger from './shared/logger/logger.js';
import app from './app.js';

async function bootstrap() {
    try {
        await connectDatabase();

        const server = http.createServer(app);

        server.listen(env.PORT, () => {
            logger.info(
                `🚀 Server running on http://localhost:${env.PORT}`,
            );
        });

        process.on('SIGINT', () => {
            logger.info('Shutting down server...');
            server.close(() => process.exit(0));
        });

        process.on('SIGTERM', () => {
            logger.info('Shutting down server...');
            server.close(() => process.exit(0));
        });
    } catch (error) {
        logger.error(error);

        process.exit(1);
    }
}

bootstrap();