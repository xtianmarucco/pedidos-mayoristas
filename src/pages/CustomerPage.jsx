// src/pages/CustomerPage.jsx

import ProductCard from '../components/ProductCard/ProductCard';

const products = [
  {
    id: 1,
    name: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Producto 3',
    description: 'Descripción del producto 3',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
  },
  // Añadir más productos si es necesario
];

const CustomerPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Customer Page</h1>
      <div className="flex flex-wrap justify-center">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CustomerPage;
