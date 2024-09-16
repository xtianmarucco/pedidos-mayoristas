import { useState } from 'react';
import OrderReceipt from '../order-receipt/OrderReceipt';

const OrderCard = ({ order, customer }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  const handleCardClick = () => {
    setShowReceipt(true);
  };

  const handleModalClose = () => {
    setShowReceipt(false);
  };

  return (
    <>
      {showReceipt ? (
        <OrderReceipt order={order} customer={customer} onClose={handleModalClose} />
      ) : (
        <div 
          onClick={handleCardClick} 
          className="border p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow"
        >
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
            <div>
              <h2 className="text-lg font-bold">{order.userName}</h2>
              <p>{order.userAddress}</p>
              <p className="text-sm text-gray-600">Total: ${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
