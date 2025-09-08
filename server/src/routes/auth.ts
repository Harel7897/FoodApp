import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config.js';


const router = Router();


// Seed admin if not exists
router.post('/seed-admin', async (_req, res) => {
const existing = await User.findOne({ email: config.adminEmail });
if (existing) return res.json({ ok: true, seeded: false });
const hash = await bcrypt.hash(config.adminPassword, 10);
await User.create({ email: config.adminEmail, password: hash, role: 'admin' });
return res.json({ ok: true, seeded: true });
});


router.post('/login', async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '7d' });
res.json({ token });
});


export default router;