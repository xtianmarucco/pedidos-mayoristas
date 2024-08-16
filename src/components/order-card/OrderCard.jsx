// src/components/OrderCard.jsx

const OrderCard = ({ order }) => {
 const placeholderImage = "data:image/jpeg;base64,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"

 
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
      {/* Imagen de perfil */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={placeholderImage}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      {/* Información de la orden */}
      <div>
        <h3 className="text-xl font-bold mb-2">{order.userName}</h3>

        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Otras formas de pago:</span> $
          {order.totalWithSurcharge.toFixed(2)}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Total:</span> $
          {order.totalPrice.toFixed(2)}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Dirección:</span> {order.userAddress}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Fecha:</span> {order.orderDate}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
