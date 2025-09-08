import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (_req, res) => res.json({ ok: true, service: 'food-app-server' }));
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);


async function start() {
await mongoose.connect(config.mongoUri);
app.listen(config.port, () => console.log(`Server listening on http://localhost:${config.port}`));
}
start().catch(err => { console.error(err); process.exit(1); });