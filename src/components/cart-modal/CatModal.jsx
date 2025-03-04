// src/components/CartModal.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const CartModal = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div
      className="fixed width-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div className="bg-white w-1/4 rounded-lg p-6 relative shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

      >
       
        <div >
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <h1 className="text-2xl font-bold mb-4">Tu pedido</h1>
          {cartItems.length > 0 ? (
            <div>
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                  >
                    <div>
                      <h2 className="text-xl font-bold">{item.name}</h2>
                      <p>Cantidad: {item.quantity}</p>
                      <p>Precio: ${item.price.toFixed(2)}</p>
                      <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-6">
                <p className="text-xl font-bold">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                >
                  limpiar carrito{" "}
                </button>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600 transition-colors duration-200"
              >
                Continuar compra
              </button>
            </div>
          ) : (
            <p className="text-lg">No hay productos en tu orden.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CartModal;
