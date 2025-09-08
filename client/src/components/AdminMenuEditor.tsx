import React, { useEffect, useState } from 'react';
import './AdminMenuEditor.css';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { type MenuItem } from '../types';

const empty: Partial<MenuItem> = { name: '', price: 0, description: '', imageUrl: '', category: '', isAvailable: true };

const AdminMenuEditor: React.FC = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<Partial<MenuItem>>(empty);

  const load = async () => setItems(await api.getMenu());
  useEffect(() => { load(); }, []);

const save = async (e: any) => {
    e.preventDefault()
  if (!token) return;

  // הדפסת הנתונים לפני שליחה
  console.log("Sending data to server:", form);

  if (!form.name || form.price === undefined) {
    return alert('שם ומחיר נדרשים');
  }

  await api.createMenuItem(token, form);

  setForm(empty); 
  await load();
};


  const update = async (id: string, patch: Partial<MenuItem>) => {
    if (!token) return; await api.updateMenuItem(token, id, patch); await load();
  };

  const remove = async (id: string) => { if (!token) return; await api.deleteMenuItem(token, id); await load(); };

  return (
    <div className="admin">
      <div className="card editor">
        <h3>הוספת פריט</h3>
        <div className="grid2">
          <input className="input" placeholder="שם"  value={form.name||''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="input" placeholder="מחיר" type="number" value={form.price||0} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
          <input className="input" placeholder="קטגוריה" value={form.category||''} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          <input className="input" placeholder="תמונה (URL)" value={form.imageUrl||''} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} />
          <textarea className="input" placeholder="תיאור" value={form.description||''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <input type="checkbox" checked={form.isAvailable ?? true} onChange={e => setForm(f => ({ ...f, isAvailable: e.target.checked }))} /> זמין
          </label>
        </div>
        <button className="btn" onClick={save}>שמור</button>
      </div>

      <div className="card table">
        <h3>תפריט קיים</h3>
        <table>
          <thead>
            <tr><th>שם</th><th>מחיר</th><th>קטגוריה</th><th>זמין</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td>
                  <input type="number" defaultValue={i.price} onBlur={(e) => update(i._id, { price: Number(e.target.value) })} />
                </td>
                <td><input defaultValue={i.category||''} onBlur={(e) => update(i._id, { category: e.target.value })} /></td>
                <td>
                  <input type="checkbox" defaultChecked={i.isAvailable} onChange={(e) => update(i._id, { isAvailable: e.target.checked })} />
                </td>
                <td>
                  <button className="btn" style={{ background:'#888' }} onClick={() => update(i._id, { name: prompt('שם חדש', i.name)||i.name })}>ערוך</button>
                  <button className="btn" style={{ background:'#c0392b' }} onClick={() => remove(i._id)}>מחק</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminMenuEditor;