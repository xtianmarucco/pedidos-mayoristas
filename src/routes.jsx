// src/routes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
