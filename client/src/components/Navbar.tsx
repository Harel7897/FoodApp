import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../context/CartContext';


const Navbar: React.FC = () => {
const { items, total } = useCart();
const count = items.reduce((s, i) => s + i.qty, 0);
return (
<header className="nav">
<div className="nav-inner container">
<Link to="/" className="logo">🍽️ FoodApp</Link>
<nav className="links">
<Link to="/menu">תפריט</Link>
<Link to="/cart">עגלה ({count})</Link>
<Link to="/admin">ניהול</Link>
</nav>
<div className="total">סה"כ: ₪{total.toFixed(2)}</div>
</div>
</header>
);
};
export default Navbar;