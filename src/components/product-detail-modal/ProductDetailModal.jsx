// src/components/ProductDetailModal.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { addItem } from '../../features/cart/cartSlice';

const ProductDetailModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addItem({ id: product.id, name: product.name, price: product.price, quantity }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white rounded-lg p-5 max-h[200px] max-w[250px] justify-between flex relative">
        <button onClick={onClose} className="absolute top-4 right-5 text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="w-1/2 h-full">
          <img className="w-full h-full object-contain rounded-l-lg" src={product.image} alt={product.name} />
        </div>
        <div className="w-1/2 pl-6 flex  mt-20 flex-col">
          <div>
            <h2 className="text-2xl mt-auto font-bold mb-4">{product.name}</h2>
            <p className="text-gray-700 mt-10 mb-4">{product.description}</p>
          </div>
          <div className="flex justify-left mt-auto mb-4">
            <button onClick={handleDecrease} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200">
              -
            </button>
            <span className="text-lg ml-5 mr-5">{quantity}</span>
            <button onClick={handleIncrease} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200">
              +
            </button>
          </div>
          <p className="text-xl font-bold  mb-4">
            Total: ${(product.price * quantity).toFixed(2)}
          </p>
          <button onClick={handleAddToCart} className="mt-auto mb-10 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200 mb-2">
            Agregar al pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
