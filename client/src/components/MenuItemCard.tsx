import React from 'react';
import './MenuItemCard.css';
import type { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { useFx } from '../context/FunctionsContext';


const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
const { add } = useCart();
const { formatCurrency } = useFx();


return (
<div className="card item-card">
{item.imageUrl && <img src={item.imageUrl} alt={item.name} className="thumb" />}
<h3>{item.name}</h3>
<p className="desc">{item.description}</p>
<div className="row">
<span className="price">{formatCurrency(item.price)}</span>
<button className="btn" onClick={() => add(item)}>הוסף</button>
</div>
</div>
);
};
export default MenuItemCard;