import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from '../../components/loader/loader'

const ProductList = ( {filteredProducts} ) => {
  const { loading } = useProducts();
  if (loading) {
    return <Loader/>;
  }
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filteredProducts && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No se encontraron productos para la búsqueda o filtro aplicado.</p>
      )}
    </div>
  );
};

export default ProductList;
