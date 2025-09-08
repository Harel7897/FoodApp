import React from 'react';
import './Menu.css';
import MenuList from '../components/MenuList';
import CartDrawer from '../components/CartDrawer';


const Menu: React.FC = () => (
<div className="menu-layout">
<div className="menu-col"><MenuList /></div>
<div className="cart-col"><CartDrawer /></div>
</div>
);
export default Menu;