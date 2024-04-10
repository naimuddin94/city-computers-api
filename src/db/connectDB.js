import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({
    path: '../../.env',
});

const connectDB = async () => {
    console.log('connecting to database');

    await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
    console.log('connected to database successfully');
};

export default connectDB;
