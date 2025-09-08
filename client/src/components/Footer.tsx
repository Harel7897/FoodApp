import React from 'react';
import './Footer.css';


const Footer: React.FC = () => (
<footer className="footer">
<div className="container">© {new Date().getFullYear()} כל הזכויות שמורות</div>
</footer>
);
export default Footer;