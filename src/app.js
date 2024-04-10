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

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'],
    withCredentials: true,
}))

// routes


// test routes
app.get('/', (req, res) => { 
    res.send('🛩️ Server is running...')
});

export default app;