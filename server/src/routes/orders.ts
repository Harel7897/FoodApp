import { Router } from 'express';
import { Order } from '../models/Order.js';
import { MenuItem } from '../models/MenuItem.js';
import { requireAdmin } from '../middleware/auth.js';


const router = Router();


// Create order (public)
router.post('/', async (req, res) => {
const { items, customerName, phone, address } = req.body as {
items: { menuItemId: string; quantity: number }[];
customerName?: string; phone?: string; address?: string;
};


const itemDocs = await Promise.all(items.map(async (i) => {
const doc = await MenuItem.findById(i.menuItemId);
if (!doc) throw new Error('Menu item not found');
return { menuItem: doc._id, quantity: i.quantity, priceAtPurchase: doc.price };
}));


const total = itemDocs.reduce((sum, i) => sum + i.quantity * i.priceAtPurchase, 0);
const order = await Order.create({ items: itemDocs, total, customerName, phone, address });
res.status(201).json(order);
});


// Admin - list orders
router.get('/', requireAdmin, async (_req, res) => {
const orders = await Order.find().populate('items.menuItem').sort({ createdAt: -1 });
res.json(orders);
});


// Admin - update status
router.put('/:id/status', requireAdmin, async (req, res) => {
const { status } = req.body as { status: 'pending'|'preparing'|'ready'|'delivered'|'canceled' };
const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
res.json(updated);
});


export default router;