const API_BASE = 'http://localhost:4000';  // הגדרת URL ישיר ל-API

async function request(path: string, options: RequestInit = {}) {
  const url = `${API_BASE}${path}`;  // יצירת ה-URL המלא

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    method: options.method,
    body: options.body
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'API error');
  }
  return res.json();
}

export const api = {
  seedAdmin: () => request('/api/auth/seed-admin', { method: 'POST' }),
  login: (email: string, password: string) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  getMenu: (): Promise<any[]> => request('/api/menu'),
  createMenuItem: (token: string, data: any) => request('/api/menu', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
  updateMenuItem: (token: string, id: string, data: any) => request(`/api/menu/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
  deleteMenuItem: (token: string, id: string) => request(`/api/menu/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
  createOrder: (payload: { items: { menuItemId: string; quantity: number }[]; customerName?: string; phone?: string; address?: string; }) =>
    request('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  listOrders: (token: string) => request('/api/orders', { headers: { Authorization: `Bearer ${token}` } }),
  updateOrderStatus: (token: string, id: string, status: string) => request(`/api/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }), headers: { Authorization: `Bearer ${token}` } }),
};
