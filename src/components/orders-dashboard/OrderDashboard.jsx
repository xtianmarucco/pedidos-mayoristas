// src/components/OrdersDashboard.jsx
import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import OrderCard from "../order-card/OrderCard";

const OrdersDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchOrders = async () => {
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("id, user_id, total_price, total_with_surcharge, order_date")
          .gte("order_date", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .order("order_date", { ascending: false });
  
        if (ordersError) {
          console.error("Error fetching orders:", ordersError);
          setLoading(false);
          return;
        }
  
        const userIds = [...new Set(ordersData.map(order => order.user_id))];
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("id, name, lastName, address, paymentMethod")
          .in("id", userIds);
  
        if (usersError) {
          console.error("Error fetching users:", usersError);
          setLoading(false);
          return;
        }
  
        const usersMap = {};
        usersData.forEach(user => {
          usersMap[user.id] = user;
        });
  
        setOrders(ordersData);
        setUsers(usersMap);
        setLoading(false);
      };
  
      fetchOrders();
    }, []);
  
    if (loading) {
      return <div>Cargando órdenes...</div>;
    }
  
    return (
      <div className="pl-0">
        <h1 className="text-2xl font-bold mb-6">Órdenes de los Últimos 7 Días</h1>
        {orders.length > 0 ? (
          orders.map((order) => {
            const user = users[order.user_id];
            return (
              <OrderCard
                key={order.id}
                order={{
                  totalPrice: order.total_price,
                  totalWithSurcharge: order.total_with_surcharge,
                  orderDate: order.order_date,
                  userName: `${user.name} ${user.lastName}`,
                  userAddress: user.address,
                  paymentMethod: user.paymentMethod,
                }}
              />
            );
          })
        ) : (
          <p>No hay órdenes en los últimos 7 días.</p>
        )}
      </div>
    );
  };
  
  export default OrdersDashboard;