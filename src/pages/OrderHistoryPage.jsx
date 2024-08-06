// src/pages/OrderHistoryPage.jsx
import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/customer-navbar/CustomerNavBar';
import supabase from '../supabaseClient';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('order_date', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  return (
    <>
    <Navbar/>
     <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Order History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Items</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b text-right">
                  ${order.total_price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>
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

