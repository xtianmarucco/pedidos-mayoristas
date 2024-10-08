// src/pages/CustomerPage.jsx
import React, { useState, useEffect } from 'react';
import ProductsSidebar from '../components/products-sidebar/ProductsSidebar';
import ProductList from '../components/product-list/ProductList';
import CustomerNavbar from '../components/customer-navbar/CustomerNavBar'
import useProducts from '../hooks/useProducts';
import Loader from '../components/loader/loader';

const CustomerPage = () => {
  const { products, loading, error } = useProducts(); // Traemos todos los productos con el hook
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para productos filtrados
  const [selectedCategory, setSelectedCategory] = useState('All'); // Estado para la categoría seleccionada
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    // Filtrar productos según la categoría seleccionada
    const filterProducts = () => {
      let updatedProducts = products;

      if (selectedCategory !== "All") {
        updatedProducts = updatedProducts.filter(
          (product) => product.category === selectedCategory
        );
      }

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [products, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <CustomerNavbar/>
     <div className="flex">
    {/* Sidebar con categorías y búsqueda */}
    <ProductsSidebar
      categories={[...new Set(products.map((product) => product.category))]} // Genera lista única de categorías
      onSelectCategory={handleCategorySelect}
      onSearch={handleSearch}
    />
    {/* Contenido principal: lista de productos */}
    <div className="flex-grow">
      <h1 className="text-4xl font-bold ml-5 mt-5" >Lista de Productos</h1>
      {/* Pasamos los productos filtrados */}
      <ProductList filteredProducts={filteredProducts}  />
    </div>
  </div></>
   
  );
};

export default CustomerPage;
