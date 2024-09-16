import { useState, useEffect } from "react";
import { fetchOrdersAndUsers } from "../../utils/fetchOrders"; // Importa la función reutilizable
import OrderCard from "../order-card/OrderCard";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchOrdersAndUsers();
      if (error) {
        console.error("Error fetching orders and users:", error);
      } else {
        setOrders(data); // Usamos los datos combinados directamente
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  return (
    <div className="pl-0">
      <h1 className="text-2xl font-bold mb-6">Órdenes de los Últimos 7 Días</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={{
              totalPrice: order.total_price,
              totalWithSurcharge: order.total_with_surcharge,
              orderDate: order.order_date,
              userName: order.userName,
              userAddress: order.userAddress,
              paymentMethod: order.paymentMethod,
              items: order.items,
            }}
          />
        ))
      ) : (
        <p>No hay órdenes en los últimos 7 días.</p>
      )}
    </div>
  );
};

export default OrdersDashboard;
