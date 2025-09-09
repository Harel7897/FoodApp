import { Router } from 'express';
import { MenuItem } from '../models/MenuItem.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', async (_req, res) => {
  const items = await MenuItem.find({ isAvailable: true }).sort({ createdAt: -1 });
  res.json(items);
});

// Admin
router.post('/', requireAdmin, async (req, res) => {
  console.log("Received data:", req.body);  // הדפסת הנתונים המתקבלים

  const { name, price, description, imageUrl, category, isAvailable } = req.body;

  if (!name || !name.trim() || price === undefined || price === null || price <= 0) {
    return res.status(400).json({ message: 'שדות חובה חסרים: name, price' });
  }

  const created = await MenuItem.create({ name, price, description, imageUrl, category, isAvailable });
  res.status(201).json(created);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
