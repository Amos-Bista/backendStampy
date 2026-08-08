import app from '../src/app.js';
import { connectDatabase } from '../src/config/database.js';

let databaseConnected = false;

export default async function handler(req: any, res: any) {
    try {
        if (!databaseConnected) {
            await connectDatabase();
            databaseConnected = true;
        }

        return app(req, res);
    } catch (error) {
        console.error('Vercel function error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}