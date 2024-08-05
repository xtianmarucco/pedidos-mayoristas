// src/components/CartModal.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../features/cart/cartSlice';

import { useNavigate } from 'react-router-dom';

const CartModal = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    console.log(cartItems)
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
              <button onClick={handleClearCart} className="bg-red-500 text-white px-4 py-2 rounded">
                Clear Cart
              </button>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-2 mt-4 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        ) : (
          <p className="text-lg">Your cart is empty.</p>
        )}
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
