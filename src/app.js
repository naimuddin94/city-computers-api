/* eslint-disable prettier/prettier */
/*
 * Title: City Computers
 * Description: A Ecommerce Application API
 * Author: Md Naim Uddin
 * Date: 10/04/2024
 *
 */

// dependencies
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import brandRouter from './routes/brand.routes.js';
import categoryRouter from './routes/category.routes.js';
import productRouter from './routes/product.routes.js';
import subCategoryRouter from './routes/subCategory.routes.js';
import userRouter from './routes/user.routes.js';
import { globalErrorHandler } from './utils/index.js';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        withCredentials: true,
    }),
);

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/sub-categories', subCategoryRouter);
app.use('/api/v1/products', productRouter);

// test routes
app.get('/', (req, res) => {
    res.send('🛩️ Server is running...');
});

// handle not found routes
app.get('*', (req, res, next) => {
    const error = new Error(`Can't find route ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
});

// error handling middleware
app.use(globalErrorHandler);

export default app;
