import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App: React.FC = () => (
<div>
<Navbar />
<main className="container" style={{ minHeight: '70vh' }}>
<Outlet />
</main>
<Footer />
</div>
);
export default App;
