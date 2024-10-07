// src/pages/CustomerPage.jsx
import CustomerNavBar from "../components/customer-navbar/CustomerNavBar";
import ProductList from "../components/product-list/ProductList";

const CustomerPage = () => {
  

  return (
    <div>
      <CustomerNavBar />
      <div className="flex w-auto">
      
        <div className="h-screen w-3/4 flex flex-col pl-10 pt-10 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6">Lista de Productos</h1>
        <ProductList/>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
