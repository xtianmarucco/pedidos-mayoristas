// src/components/AdminNavBar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faHistory } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../features/auth/authSlice';

const AdminNavBar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/admin">Admin Dashboard</Link>
        </div>
        <ul className="flex space-x-4 items-center">
          {isAuthenticated && (
            <>
              <li>
                <Link to="/admin/order-history" className="text-white font-medium hover:underline flex items-center">
                  <FontAwesomeIcon icon={faHistory} className="mr-2" />
                  Ver Historial de Pedidos
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
                <span className="text-white font-medium">{user.name}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white font-medium hover:underline flex items-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Salir
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavBar;
