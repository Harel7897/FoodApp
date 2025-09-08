import dotenv from 'dotenv';
dotenv.config();


export const config = {
port: Number(process.env.PORT) || 4000,
mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/foodapp',
jwtSecret: process.env.JWT_SECRET || 'devsecret',
adminEmail: process.env.ADMIN_EMAIL || 'owner@example.com',
adminPassword: process.env.ADMIN_PASSWORD || 'ChangeMe123!'
};