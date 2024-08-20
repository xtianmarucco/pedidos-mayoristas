// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/customer-navbar/CustomerNavBar";
import OrderSuccessModal from "../components/order-success-modal/OrderSuccessModal";
import OrderFailureModal from "../components/order-fail-modal/OrderFailureModal";
import Loader from "../components/loader/loader";
import supabase from "../supabaseClient";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalWithSurcharge = totalPrice * 1.1;

  const createOrderObject = () => {
    const order = {
      user_id: user.id,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      total_price: totalPrice,
      total_with_surcharge: totalWithSurcharge,
      order_date: new Date().toISOString(),
      status: "Pending",
    };
    return order;
  };

  const [loading, setLoading] = useState(false); // Establece loading en false inicialmente
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
  const [isOrderFailureModalOpen, setIsOrderFailureModalOpen] = useState(false);

  const handleConfirmOrder = async () => {
    setLoading(true); // Muestra el Loader
    const orderObject = createOrderObject();
    
    const { data, error } = await supabase.from('orders').insert(orderObject);
  
    if (error) {
      console.error('Error inserting order:', error);
      setIsOrderFailureModalOpen(true);
    } else {
      console.log('Order inserted successfully:', data);
      setIsOrderSuccessModalOpen(true);
    }
    setLoading(false); // Oculta el Loader
  };

  return (
    <>
      {isOrderSuccessModalOpen && (
        <OrderSuccessModal onClose={() => setIsOrderSuccessModalOpen(false)} />
      )}
      {isOrderFailureModalOpen && (
        <OrderFailureModal onClose={() => setIsOrderFailureModalOpen(false)} />
      )}
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>
        {loading ? (
          <Loader /> // Muestra el Loader cuando está en proceso
        ) : cartItems.length > 0 ? (
          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.quantity}
                      </div>
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${item.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="py-2 px-4 text-right font-bold">
                    Total
                  </td>
                  <td className="py-2 px-4 text-right font-bold">
                    ${totalPrice.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="py-2 px-4 text-right font-bold">
                    Otros medios de pago
                  </td>
                  <td className="py-2 px-4 text-right font-bold">
                    ${totalWithSurcharge.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleConfirmOrder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg">
            Tu carrito está vacío. Por favor, añade productos para proceder.
          </p>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
