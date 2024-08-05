// src/components/Navbar.jsx
import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartModal from '../../components/cart-modal/CatModal';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Pedidos</Link>
        </div>
        <div className="flex space-x-4 items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Profile
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Log Out
          </button>
          <button onClick={handleOpenCart} className="relative">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white text-2xl" />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
      {isCartOpen && <CartModal onClose={handleCloseCart} />}
    </nav>
  );
};

export default Navbar;
