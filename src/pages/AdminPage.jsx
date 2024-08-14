// src/pages/AdminPage.jsx
import AdminNavBar from "../components/admin-navbar/AdminNavBar";
import AdminSidebar from "../components/admin-sidebar/AdminSidebar";
import OrdersDashboard from "../components/orders-dashboard/OrderDashboard";

const AdminPage = () => {
  const handleSearch = (query) => {
    console.log("Buscar:", query);
  };

  const handleAddCustomer = () => {
    console.log("Mostrar formulario para agregar cliente");
  };

  const handleAddAdmin = () => {
    console.log("Mostrar formulario para agregar administrador");
  };

  return (
    <div className="h-screen">
      <AdminNavBar />
      <div className="flex">
        <AdminSidebar
          onSearch={handleSearch}
          onAddCustomer={handleAddCustomer}
          onAddAdmin={handleAddAdmin}
        />
        <div className="w-3/4 p-6">
          <h1 className="text-4xl font-bold mb-6">Panel de Administración</h1>
          <OrdersDashboard/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
