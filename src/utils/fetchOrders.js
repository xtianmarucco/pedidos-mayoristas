import supabase from '../supabaseClient';

export const fetchOrdersAndUsers = async () => {
  try {
    // Obtener las órdenes
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('id, user_id, order_date, total_price, total_with_surcharge, items');

    if (ordersError) throw ordersError;

    // Obtener los usuarios relacionados con las órdenes
    const userIds = [...new Set(ordersData.map(order => order.user_id))];
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, name, address, payment_method')
      .in('id', userIds);

    if (usersError) throw usersError;

    // Crear un mapa de usuarios para acceder fácilmente por ID
    const usersMap = {};
    usersData.forEach(user => {
      usersMap[user.id] = user;
    });

    // Combinar datos de órdenes con los datos de usuarios
    const combinedOrders = ordersData.map(order => ({
      ...order,
      userName: usersMap[order.user_id]?.name,
      userAddress: usersMap[order.user_id]?.address,
    }));
    console.log(combinedOrders[0])

    return { data: combinedOrders, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
