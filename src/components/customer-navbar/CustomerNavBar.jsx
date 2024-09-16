// src/components/Navbar.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faClipboardList,
  faIceCream,
} from "@fortawesome/free-solid-svg-icons";
import CartModal from "../cart-modal/CatModal";
import { logout } from "../../features/auth/authSlice";

const CustomerNavBar = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.cart) || [];
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
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
  

    <>
      <nav className="bg-blue-800 drop-shadow-md">
        <div className="container mx-auto flex justify-between items-center h-16">
          <div className="text-white text-2xl font-bold h-full flex items-center">
            <Link
              to="/customer"
              className="h-full flex items-center active:bg-blue-500"
            >
              Pedidos Mayoristas
            </Link>
          </div>
          <ul className="flex space-x-4 items-center h-full">
            {isAuthenticated && (
              <>
                <Link
                  to="/customer"
                  className="text-white font-medium h-full flex items-center px-4 hover:bg-blue-700 active:bg-blue-500"
                >
                  <FontAwesomeIcon icon={faIceCream} className="mr-2" />
                  Productos
                </Link>
                <li className="h-full">
                  <Link
                    to="/order-history"
                    className="text-white font-medium h-full flex items-center px-4 hover:bg-blue-700 active:bg-blue-500"
                  >
                    <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                    Pedidos
                  </Link>
                </li>

                <li className="flex items-center space-x-2 h-full px-4">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-white text-xl"
                  />
                  <span className="text-white font-medium">{user.name}</span>
                </li>
              </>
            )}
            <li className="h-full">
              <button
                onClick={handleOpenCart}
                className="relative h-full flex items-center px-4 hover:bg-blue-700 active:bg-blue-500"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-white text-2xl"
                />
                {totalQuantity > 0 && (
                  <span className="absolute top-9 right-28 bg-red-500 text-white rounded-full px-2 text-sm ">
                    {totalQuantity}
                  </span>
                )}
                <span className="ml-2 text-white font-medium">Tu pedido</span>
              </button>
            </li>
            <li className="h-full">
              <button
                onClick={handleLogout}
                className="text-white font-medium h-full flex items-center px-4 hover:bg-blue-700 active:bg-blue-500"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Salir
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {isCartOpen && <CartModal onClose={handleCloseCart} />}

    </>
  );
};

export default CustomerNavBar;
