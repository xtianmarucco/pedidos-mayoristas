// src/pages/OrderHistoryPage.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/customer-navbar/CustomerNavBar";
import supabase from "../supabaseClient";
import { Loader } from "../components/loader/loader";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("order_date", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-8">
        <h1 className="text-4xl font-bold text-left mb-6">Historial de pedidos</h1>
        {loading ? (
<Loader/>
) : orders.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {order.items.map((item) => (
                      <div className="text-sm font-medium text-gray-900" key={item.id}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    ${order.total_price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
};

export default OrderHistoryPage;
