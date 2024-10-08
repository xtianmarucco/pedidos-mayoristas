import { useState } from "react";
import ProductDetailModal from "../product-detail-modal/ProductDetailModal";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
      <div className="w-60 min-h-[400px] max-h-[350px] rounded shadow-lg m-4 flex flex-col justify-between bg-white fade-in-up">
        <img
          className="w-full h-40 object-contain"
          src={product.image_url}
          // alt={product.product_name}
        />
        <div className="px-6 py-4 flex-grow">
          <div className="font-bold text-xl mb-2">{product.product_name}</div>
          {/* <p className="text-gray-700 text-base">
        {product.description}
      </p> */}
          <p className="text-gray-900 font-semibold mt-2">${product.price}</p>
        </div>
        <div className="px-6 py-4">
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Agregar Producto
          </button>
        </div>
        {isModalOpen && (
          <ProductDetailModal product={product} onClose={handleCloseModal} />
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
