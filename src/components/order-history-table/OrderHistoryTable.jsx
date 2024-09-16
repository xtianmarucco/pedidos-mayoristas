import { useState, useEffect } from 'react';
import supabase from '../supabaseClient'; // Asume que usas Supabase para obtener las órdenes

const OrderHistoryTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, userName, userAddress, orderDate, totalPrice');

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Historial de Órdenes</h1>
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
            <tr key={order.id}>
              <td className="py-2 px-4 border">{order.userName}</td>
              <td className="py-2 px-4 border">{order.userAddress}</td>
              <td className="py-2 px-4 border">{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border">${order.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
