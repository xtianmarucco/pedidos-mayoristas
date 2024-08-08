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
    <div className="w-60 max-h-[400px] rounded shadow-lg m-4 flex flex-col justify-between bg-white">
      <img className="w-full h-40 object-contain" src={product.image} alt={product.name} />
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        {/* <p className="text-gray-700 text-base">
          {product.description}
        </p> */}
        <p className="text-gray-900 font-semibold mt-2">${product.price}</p>
      </div>
      <div className="px-6 py-4">
        <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Agregar Producto
        </button>
      </div>
      {isModalOpen && <ProductDetailModal product={product} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductCard;
