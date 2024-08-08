// src/components/ProductsSidebar.jsx
import { useState } from "react";
import ProductSearch from "../product-search/ProductSearch";

const ProductsSidebar = ({ categories, onSelectCategory, onSearch }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <>
      <aside className="w-1/4 p-4 bg-blue-700 text-white">
        <ProductSearch onSearch={onSearch} />
        <ul>
          <li
            className={`mb-2 ${activeCategory === "All" ? "bg-blue-500" : ""}`}
          >
            <button
              onClick={() => handleCategoryClick("All")}
              className="w-auto text-left px-2 py-1 hover:bg-blue-500 rounded"
            >
              Todos los productos
            </button>
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`mb-2 ${
                activeCategory === category ? "bg-blue-500" : ""
              }`}
            >
              <button
                onClick={() => handleCategoryClick(category)}
                className="w-full text-left px-2 py-1 hover:bg-blue-500 rounded"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default ProductsSidebar;
