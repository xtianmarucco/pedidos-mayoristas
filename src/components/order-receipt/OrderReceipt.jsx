import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Toast from "../toast/Toast";

const OrderReceipt = ({ order, onClose }) => {
  const [showToast, setShowToast] = useState(false);

  const generatePDF = () => {
    const input = document.getElementById('receipt');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save(`receipt_${order.id}.pdf`);

        setShowToast(true); // Mostrar el toast

        // Cerrar el modal después de un pequeño retraso para que se muestre el toast correctamente
        setTimeout(() => {
          onClose(); // Cierra el modal
        }, 3000);
      })
      .catch((error) => {
        console.error('Error generating PDF', error);
      });
  };

  return (
    <>
      {showToast && (
        <Toast message="El recibo se generó con éxito. Puedes encontrarlo en tu carpeta de descargas." />
      )}

      <div className="h-full w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5">
        <div
          className="bg-white rounded-lg p-8 max-w-[1000px] justify-between flex-column relative"
          id="receipt"
        >
          {/* Botón para cerrar el modal */}
          <button onClick={onClose} className="absolute top-4 right-5 text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <img src="/grido-logo.webp" alt="Logo" className="h-16" />
            <div className="text-left">
              <h2 className="text-xl font-bold">Grido Barranqueras</h2>
              <p>Av Castelli 4140 N° 847</p>
              <p>Fecha: {order.order_date}</p>
            </div>
          </div>
          <hr className="mb-6" />

          {/* Información del Cliente */}
          <div className="mb-6">
            <p className="font-semibold">Cliente: <span className="font-normal">{order.userName}</span></p>
            <p className="font-semibold">Direccion: <span className="font-normal">{order.userAddress}</span></p>
            <p className="font-semibold">Código Postal: <span className="font-normal"> 3500</span></p>
          </div>
          <hr className="mb-6" />

          {/* Método de Pago */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Método de Pago:</h3>
            <p>{order.payment_method}</p>
          </div>
          <hr className="mb-6" />

          {/* Tabla de Detalles de la Orden */}
          <table className="min-w-full border border-gray-300 mb-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">N° Art.</th>
                <th className="py-2 px-4 border">Detalle del Producto</th>
                <th className="py-2 px-4 border">Cantidad</th>
                <th className="py-2 px-4 border">P. Unitario</th>
                <th className="py-2 px-4 border">P. Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border">{item.id}</td>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border text-center">{item.quantity}</td>
                  <td className="py-2 px-4 border text-right">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border text-right">${(item.total.toFixed(2))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="text-right">
            <p className="text-xl font-bold">Total Contado Efectivo: $ {order.total_price}</p>
            <p className="text-lg font-bold text-gray-700">
              Total Precio Lista P/ Otras Formas de Pago: $ {order.total_with_surcharge}
            </p>
          </div>

          <button onClick={generatePDF} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Descargar recibo y cerrar ventana
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderReceipt;
