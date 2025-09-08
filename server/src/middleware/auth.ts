import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';


export interface AuthedRequest extends Request {
user?: { id: string; role: 'admin' };
}


export const requireAdmin = (req: AuthedRequest, res: Response, next: NextFunction) => {
const header = req.headers.authorization;
if (!header) return res.status(401).json({ message: 'Missing Authorization header' });
const token = header.replace('Bearer ', '');
try {
const payload = jwt.verify(token, config.jwtSecret) as any;
if (payload.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
req.user = { id: payload.id, role: 'admin' };
return next();
} catch (e) {
return res.status(401).json({ message: 'Invalid token' });
}
};