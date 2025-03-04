// src/routes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
// import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/private-router/PrivateRoute';
import OrderHistoryPage from './pages/OrderHistoryPage'; // Importa el nuevo componente de historial
import AdminOrderHistory from './pages/AdminOrderHistory';

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/customer"
        element={
          <PrivateRoute roles={['customer']}>
            <CustomerPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute roles={['admin']}>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/order-history"
        element={
          <PrivateRoute roles={['admin']}>
            <AdminOrderHistory/>
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute roles={['customer']}>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
        <Route
        path="/order-history"
        element={
          <PrivateRoute roles={['customer']}>
            <OrderHistoryPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
  );
};

export default AppRoutes;
