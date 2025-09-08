import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


const Home: React.FC = () => (
<section className="hero card">
<h1>ברוכים הבאים!</h1>
<p>הזמינו אוכל מהתפריט שלנו - טרי וטעים.</p>
<Link to="/menu" className="btn">לתפריט</Link>
</section>
);
export default Home;