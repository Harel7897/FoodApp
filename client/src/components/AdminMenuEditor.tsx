import React, { useEffect, useState } from 'react';
import './AdminMenuEditor.css';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { type MenuItem } from '../types';
import { uploadImageToCloudinary } from '../services/upload'; // הוספתי את זה

const empty: Partial<MenuItem> = { name: '', price: 0, description: '', imageUrl: '', category: '', isAvailable: true };

const AdminMenuEditor: React.FC = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<Partial<MenuItem>>(empty);
  const [imageFile, setImageFile] = useState<File | null>(null); // ← קובץ מקומי שנבחר

  const load = async () => {
    if (token) {
      try {
        const all = await api.getAllMenuItems(token);
        setItems(all);
        return;
      } catch (err) {
        console.warn('failed to load admin list, falling back to public', err);
      }
    }
    setItems(await api.getMenu());
  };
  useEffect(() => { load(); }, [token]);

  const save = async (e: any) => {
    e.preventDefault();
    if (!token) return;

    // הדפסת הנתונים לפני שליחה
    console.log("Sending data to server:", form);

    if (!form.name || form.price === undefined) {
      return alert('שם ומחיר נדרשים');
    }

    // If form has _id -> update, else create
    if (form._id) {
      const patch: Partial<MenuItem> = { ...form };
      // if a new image file is selected, upload it first
      if (imageFile) {
        try {
          const secureUrl = await uploadImageToCloudinary(imageFile, {
            cloudName: 'dsfieqr7i',
            uploadPreset: 'unsigned_preset',
          });
          patch.imageUrl = secureUrl;
        } catch (err) {
          console.error('Image upload failed:', err);
          alert('Image upload failed');
          return;
        }
      }
      await api.updateMenuItem(token, String(form._id), patch);
    } else {
      // create new item (with or without image)
      if (imageFile) {
        try {
          const secureUrl = await uploadImageToCloudinary(imageFile, {
            cloudName: 'dsfieqr7i',
            uploadPreset: 'unsigned_preset',
          });
          setForm(f => ({ ...f, imageUrl: secureUrl }));
          await api.createMenuItem(token, { ...form, imageUrl: secureUrl });
        } catch (err) {
          console.error('העלאת התמונה נכשלה:', err);
          alert('העלאת התמונה נכשלה');
        }
      } else {
        await api.createMenuItem(token, form);
      }
    }

    // ניקוי הטופס והקובץ
    setImageFile(null);
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
          
          {/* בחירת קובץ תמונה מהמחשב */}
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              setImageFile(file);
              // תצוגת מקדימה מקומית (לא URL חיצוני)
              if (file) {
                const preview = URL.createObjectURL(file);
                setForm(f => ({ ...f, imageUrl: preview }));
              } else {
                setForm(f => ({ ...f, imageUrl: '' }));
              }
            }}
          />

          {/* עדיין משאיר את שדה ה-URL למקרה שרוצים גם לעבוד עם קישורים, לא חובה להשתמש בו */}

          <textarea className="input" placeholder="תיאור" value={form.description||''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <input type="checkbox" checked={form.isAvailable ?? true} onChange={e => setForm(f => ({ ...f, isAvailable: e.target.checked }))} /> זמין
          </label>

          {/* תצוגת מקדימה לתמונה שנבחרה */}
          {form.imageUrl ? (
            <img
              src={form.imageUrl}
              alt="תצוגה מקדימה"
              style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 12, background: '#f2f2f2' }}
            />
          ) : null}
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
                  <input type="checkbox" checked={i.isAvailable} onChange={(e) => update(i._id, { isAvailable: e.target.checked })} />
                </td>
                <td>
                  <button className="btn" style={{ background:'#888' }} onClick={() => {
                    // populate full form for editing the entire item
                    setForm({ ...i });
                    setImageFile(null);
                  }}>ערוך</button>
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
