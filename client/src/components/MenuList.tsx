import React, { useEffect, useState } from 'react';
import './MenuList.css';
import { api } from '../services/api';
import type { MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';


const MenuList: React.FC = () => {
const [items, setItems] = useState<MenuItem[]>([]);
const [q, setQ] = useState('');
useEffect(() => { api.getMenu().then(setItems).catch(console.error); }, []);
const filtered = items.filter(i => [i.name, i.description, i.category].join(' ').toLowerCase().includes(q.toLowerCase()));
return (
<section>
<div className="search">
<input className="input" placeholder="חיפוש..." value={q} onChange={e => setQ(e.target.value)} />
</div>
<div className="grid">
{filtered.map(i => <MenuItemCard key={i._id} item={i} />)}
</div>
</section>
);
};
export default MenuList;