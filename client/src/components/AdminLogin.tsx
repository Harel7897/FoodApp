import React, { useState, useEffect } from 'react';
import './AdminLogin.css';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const AdminLogin: React.FC = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const { login, token } = useAuth();
const navigate = useNavigate();


// אם כבר מחוברים, העבר לדשבורד
useEffect(() => { if (token) navigate('/admin', { replace: true }); }, [token, navigate]);


const submit = async (e: React.FormEvent) => {
e.preventDefault(); setLoading(true);
try {
const { token } = await api.login(email, password);
login(token);
navigate('/admin', { replace: true });
} catch (e: any) {
alert(e.message || 'שגיאה');
} finally { setLoading(false); }
};


return (
<form className="card form" onSubmit={submit}>
<h2>התחברות מנהל</h2>
<label>אימייל<input className="input" value={email} onChange={e => setEmail(e.target.value)} /></label>
<label>סיסמה<input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
<button className="btn" disabled={loading}>{loading ? 'טוען…' : 'התחבר'}</button>
<button type="button" className="btn" style={{ background: '#555' }} onClick={() => api.seedAdmin().then(() => alert('אדמין נגיש לפי .env'))}>צור אדמין ברירת מחדל</button>
</form>
);
};
export default AdminLogin;
