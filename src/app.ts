import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { env } from './config/env.js';
import notFound from './shared/middlewares/notFound.js';
import errorHandler from './shared/middlewares/errorHanlder.js';
import router from './routes/business.routes.js';
import authrouter from './modules/auth/auth.routes.js';
import offerRouter from './routes/offer.routes.js';
import stampRouter from './routes/stamp.routes.js';
import CustomerRouter from './routes/customer.routes.js';

// import notFound from './shared/middleware/notFound.js';
// import errorHandler from './shared/middleware/errorHandler.js';

// import businessRoutes from './modules/business/business.routes.js';

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
    })
);

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/health', (_, res) => {
    res.json({
        success: true,
        message: 'Stamply API Running 🚀',
    });
});


app.get('/health', (_, res) => {
    res.json({
        success: true,
        message: 'Stamply API Running 🚀',
    });
});

app.use('/api/v1/businesses', router);
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/offers", offerRouter);
app.use("/api/v1/stamps", stampRouter);
app.use("/api/v1/customers", CustomerRouter);

app.use(notFound);

app.use(errorHandler);



export default app;