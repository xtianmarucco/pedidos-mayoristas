// src/pages/CheckoutPage.jsx
import { useSelector } from 'react-redux';
import Navbar from '../components/customer-navbar/CustomerNavBar';
import supabase from '../supabaseClient'; // Importa el cliente de Supabase

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user); // Obtener el usuario autenticado

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalWithSurcharge = totalPrice * 1.1; // Añade un 10% de recargo

  const createOrderObject = () => {
    const order = {
      user_id: user.id, // Asegúrate de incluir esto
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
      status: 'Pending',
    };
  
    return order;
  };

  const handleConfirmOrder = async () => {
    const orderObject = createOrderObject();

    // Inserta la orden en la base de datos
    const { data, error } = await supabase
      .from('orders') // Asegúrate de que el nombre de la tabla coincide
      .insert(orderObject);

    if (error) {
      console.error('Error inserting order:', error);
    } else {
      console.log('Order inserted successfully:', data);
      // Aquí puedes limpiar el carrito o mostrar un mensaje de éxito
    }
  };

  return (
    <>
    <Navbar/> 
    <div className="flex flex-col">
    
    <h1 className="text-4xl font-bold mb-6">Checkout</h1>
    {cartItems.length > 0 ? (
      <div className="w-full max-w-4xl">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.quantity}
                </td>
                <td className="py-2 px-4 border-b text-right">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="py-2 px-4 border-t text-right font-bold">
                Total:
              </td>
              <td className="py-2 px-4 border-t text-right font-bold">
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="py-2 px-4 text-right font-bold">
                Otros medios de pago:
              </td>
              <td className="py-2 px-4 text-right font-bold">
                ${totalWithSurcharge.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleConfirmOrder}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      </div>
    ) : (
      <p className="text-lg">Your cart is empty. Please add items to checkout.</p>
    )}
  </div></>
   
  );
};

export default CheckoutPage;
