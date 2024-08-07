import { useState } from 'react';

import ProductDetailModal from '../product-detail-modal/ProductDetailModal';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-60 rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={product.image} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        {/* <p className="text-gray-700 text-base">
          {product.description}
        </p> */}
        <p className="text-gray-900 font-semibold mt-2">${product.price}</p>
        <button onClick={handleOpenModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Agregar Producto
        </button>
      </div>
      {isModalOpen && <ProductDetailModal product={product} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductCard;