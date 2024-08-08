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
    <div>
      <CustomerNavBar />
      <div className="flex w-auto">
        <ProductsSidebar
          categories={categories}
          onSelectCategory={handleCategorySelect}
          onSearch={handleSearch}
        />
        <div className="h-screen w-3/4 flex flex-col pl-10 pt-10 overflow-y-auto">
          <h1 className="text-4xl font-bold mb-6">Lista de Productos</h1>
          <div className="">
            <div className="flex flex-wrap  justify-left">
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
