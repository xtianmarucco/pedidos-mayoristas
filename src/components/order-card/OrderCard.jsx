// src/components/OrderCard.jsx

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
      {/* Imagen de perfil */}
      <div className="flex-shrink-0 mr-4">
        {/* <img
          src={placeholderImage}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        /> */}
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
      </div>
    </div>
  );
};

export default OrderCard;
