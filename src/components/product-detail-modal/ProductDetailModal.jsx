// src/components/ProductDetailModal.jsx
import { useState } from 'react';

const ProductDetailModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Aquí más adelante implementaremos la lógica para añadir al carrito
    console.log(`Añadiendo ${quantity} de ${product.name} al carrito`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <img className="w-full h-48 object-cover mb-4" src={product.image} alt={product.name} />
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleDecrease} className="px-2 py-1 bg-gray-300 rounded">
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button onClick={handleIncrease} className="px-2 py-1 bg-gray-300 rounded">
            +
          </button>
        </div>
        <p className="text-xl font-bold mb-4">
          Total: ${(product.price * quantity).toFixed(2)}
        </p>
        <button onClick={handleAddToCart} className="w-full bg-blue-500 text-white py-2 rounded">
          Add to Cart
        </button>
        <button onClick={onClose} className="w-full bg-red-500 text-white py-2 mt-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
