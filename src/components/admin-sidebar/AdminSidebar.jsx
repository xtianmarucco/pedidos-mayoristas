// src/components/AdminSidebar.jsx


const AdminSidebar = ({ onSearch, onAddCustomer, onAddAdmin }) => {
  return (
    <aside className="w-1/4 h-screen p-4 bg-blue-700 text-white">
      {/* Buscador de usuarios y órdenes */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar usuarios u órdenes"
          className="w-full px-2 py-1 rounded text-gray-700"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Botones para agregar usuarios */}
      <div className="mb-4">
        <button
          onClick={onAddCustomer}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar Cliente
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={onAddAdmin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Administrador
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
