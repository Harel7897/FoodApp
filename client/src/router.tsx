import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';


const router = createBrowserRouter([
{
path: '/', element: <App />, children: [
{ index: true, element: <Home /> },
{ path: 'menu', element: <Menu /> },
{ path: 'cart', element: <Cart /> },
{ path: 'admin/login', element: <AdminLogin /> },
{ path: 'admin', element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> },
]
}
]);


export default router;