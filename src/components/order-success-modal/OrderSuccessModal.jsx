// src/components/OrderSuccessModal.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const OrderSuccessModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(clearCart());
    onClose();
    navigate('/customer');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg text-center">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faCheckCircle} size="4x" className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">¡Pedido Completado!</h2>
        <p className="text-gray-700 mb-6">El pedido se ha completado con éxito, en breve confirmaremos la misma.</p>
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Volver a la Página Principal
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
