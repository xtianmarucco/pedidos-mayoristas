// src/components/Toast.jsx
import { useEffect } from 'react';

const Toast = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('toast').classList.add('hidden');
    }, 8000); // Ocultar el toast después de 5 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador
  }, []);

  return (
    <div id="toast" className="z-40 fixed bottom-4 left-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
      {message}
    </div>
  );
};

export default Toast;