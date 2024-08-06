// src/components/Navbar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import CartModal from '../cart-modal/CatModal';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/customer">Pedidos Mayoristas</Link>
        </div>
        <ul className="flex space-x-4 items-center">
          {isAuthenticated && (
            <>
            
              <li>
                <Link to="/order-history" className="text-white hover:underline">
                  Order History
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-white hover:underline">
                  Log Out
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
                <span className="text-white">{user.name}</span>
              </li>
            </>
          )}
          <li>
            <button onClick={handleOpenCart} className="relative">
              <FontAwesomeIcon icon={faShoppingCart} className="text-white text-2xl" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm">
                  {totalQuantity}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
      {isCartOpen && <CartModal onClose={handleCloseCart} />}
    </nav>
  );
};

export default Navbar;
