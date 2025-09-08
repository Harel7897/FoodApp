import React from 'react';
import './CartDrawer.css';
import { useCart } from '../context/CartContext';
import { useFx } from '../context/FunctionsContext';
import { api } from '../services/api';

const CartDrawer: React.FC = () => {
const { items, total, remove, clear } = useCart();
const { formatCurrency } = useFx();


const checkout = async () => {
if (!items.length) return;
const payload = { items: items.map(i => ({ menuItemId: i.item._id, quantity: i.qty })) };
await api.createOrder(payload);
alert('הזמנה נקלטה!');
clear();
};


return (
<aside className="drawer card">
<h3>העגלה שלי</h3>
<ul className="list">
{items.map(ci => (
<li key={ci.item._id} className="row">
<span>{ci.item.name} × {ci.qty}</span>
<span>{formatCurrency(ci.item.price * ci.qty)}</span>
<button className="link" onClick={() => remove(ci.item._id)}>הסר</button>
</li>
))}
</ul>
<div className="row" style={{ justifyContent: 'space-between' }}>
<strong>סה"כ:</strong>
<strong>{formatCurrency(total)}</strong>
</div>
<button className="btn" onClick={checkout} disabled={!items.length}>לתשלום</button>
</aside>
);
};
export default CartDrawer;