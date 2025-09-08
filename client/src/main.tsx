import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FunctionsProvider } from './context/FunctionsContext';


createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<FunctionsProvider>
<AuthProvider>
<CartProvider>
<RouterProvider router={router} />
</CartProvider>
</AuthProvider>
</FunctionsProvider>
</React.StrictMode>
);