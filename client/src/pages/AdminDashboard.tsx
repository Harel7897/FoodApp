import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AdminMenuEditor from '../components/AdminMenuEditor';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useFx } from '../context/FunctionsContext';


const AdminDashboard: React.FC = () => {
const { token, logout } = useAuth();
const [orders, setOrders] = useState<any[]>([]);
const { formatCurrency } = useFx();


const load = async () => { if (token) setOrders(await api.listOrders(token)); };
useEffect(() => { load(); }, [token]);


const setStatus = async (id: string, status: string) => { if (!token) return; await api.updateOrderStatus(token, id, status); await load(); };


return (
<div className="dash">
<div className="row between">
<h2>ניהול</h2>
<button className="btn" onClick={logout}>התנתק</button>
</div>
<div className="grid2">
<section className="card">
<h3>הזמנות</h3>
<table>
<thead>
<tr><th>תאריך</th><th>פריטים</th><th>סה"כ</th><th>סטטוס</th><th></th></tr>
</thead>
<tbody>
{orders.map(o => (
<tr key={o._id}>
<td>{new Date(o.createdAt).toLocaleString('he-IL')}</td>
<td>{o.items.map((it: any) => `${it.menuItem?.name||''}×${it.quantity}`).join(', ')}</td>
<td>{formatCurrency(o.total)}</td>
<td>{o.status}</td>
<td>
{['ממתין', 'בהכנה', 'מוכן'].map(s => (
<button key={s} className="btn"  onClick={() => setStatus(o._id, s)}>{s}</button>
))}
</td>
</tr>
))}
</tbody>
</table>
</section>
<section><AdminMenuEditor /></section>
</div>
</div>
);
};
export default AdminDashboard;