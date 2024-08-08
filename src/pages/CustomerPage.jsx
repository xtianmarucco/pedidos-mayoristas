// src/pages/CustomerPage.jsx
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import CustomerNavBar from "../components/customer-navbar/CustomerNavBar";
import ProductsSidebar from "../components/products-sidebar/ProductsSidebar";
import productsData from "../data/productsData.json"; // Importar los datos del archivo JSON

const CustomerPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  const categories = Array.from(
    new Set(productsData.map((product) => product.category))
  );

  // Filtrar productos por categoría seleccionada y por búsqueda
  const filterProducts = (category, searchTerm) => {
    let updatedProducts = products;

    if (category !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      );
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  };

  const handleSearch = (searchTerm) => {
    filterProducts(selectedCategory, searchTerm);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    filterProducts(category, "");
  };

  return (
    <div className="h-full">
      <CustomerNavBar />
      <div className="flex w-auto h-full">
        <ProductsSidebar
          categories={categories}
          onSelectCategory={handleCategorySelect}
          onSearch={handleSearch}
        />
        <div className=" w-3/4 flex flex-col pl-10 pt-10 flex-grow">
          <h1 className="text-4xl font-bold mb-6">Lista de Productos</h1>
          <div className="h-full">
            <div className="h-full flex flex-wrap  justify-left">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
