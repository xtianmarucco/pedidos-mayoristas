// src/pages/CustomerPage.jsx
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import CustomerNavBar from "../components/customer-navbar/CustomerNavBar";
import productsData from '../data/productsData.json'; // Importar los datos del archivo JSON



const CustomerPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    setProducts(productsData)
  }, []);


  return (
    <>
      <CustomerNavBar />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-6">Customer Page</h1>
        <div className="flex flex-wrap justify-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerPage;
