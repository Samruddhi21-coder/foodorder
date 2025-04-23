import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

// Layout
import MainLayout from './layouts/MainLayout';

// Auth protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { checkAuth } = useAuth();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="auth" element={<AuthPage />} />
        
        {/* Protected routes */}
        <Route path="checkout" element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="order-history" element={
          <ProtectedRoute>
            <OrderHistoryPage />
          </ProtectedRoute>
        } />
        <Route path="order-confirmation/:orderId" element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        } />
        
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;