import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import CustomerCard from "../customer-card/CustomerCard";

const ActiveCustomersDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveCustomers = async () => {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("user_id, order_date")
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
        .select("id, name, lastName, address")
        .in("id", userIds);

      if (usersError) {
        console.error("Error fetching users:", usersError);
        setLoading(false);
        return;
      }

      const customersMap = ordersData.reduce((map, order) => {
        const user = usersData.find(user => user.id === order.user_id);
        if (user && !map[user.id]) {
          map[user.id] = {
            name: `${user.name} ${user.lastName}`,
            address: user.address,
            lastOrderDate: order.order_date
          };
        }
        return map;
      }, {});

      setCustomers(Object.values(customersMap));
      setLoading(false);
    };

    fetchActiveCustomers();
  }, []);

  if (loading) {
    return <div>Cargando clientes activos...</div>;
  }

  return (
    <div className="p-2">
      <h1 className="text-1xl font-bold mb-6">Clientes Activos</h1>
      {customers.length > 0 ? (
        customers.map((customer, index) => (
          <CustomerCard key={index} customer={customer} />
        ))
      ) : (
        <p>No hay clientes activos en los últimos 7 días.</p>
      )}
    </div>
  );
};

export default ActiveCustomersDashboard;