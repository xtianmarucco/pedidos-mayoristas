import { useState, useEffect } from "react";
import { fetchOrdersAndUsers } from "../utils/fetchOrders";

import OrderReceipt from "../components/order-receipt/OrderReceipt"; // Asegúrate de importar el componente
import AdminNavBar from "../components/admin-navbar/AdminNavBar";

const AdminOrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchOrdersAndUsers();
      if (error) {
        console.error("Error fetching orders and users:", error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    console.log(order);
  };

  const handleCloseReceipt = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  return (
    <>
      <AdminNavBar/>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Historial de Órdenes</h1>
        {!selectedOrder ? (
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">Nombre del Cliente</th>
                <th className="py-2 px-4 border">Dirección</th>
                <th className="py-2 px-4 border">Fecha</th>
                <th className="py-2 px-4 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border">{order.userName}</td>
                  <td className="py-2 px-4 border">{order.userAddress}</td>
                  <td className="py-2 px-4 border">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    ${order.total_price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <OrderReceipt order={selectedOrder} onClose={handleCloseReceipt} />
        )}
      </div>
    </>
  );
};

export default AdminOrderHistoryPage;
