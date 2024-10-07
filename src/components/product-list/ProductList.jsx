import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from '../../components/loader/loader'

const ProductList = () => {
  const { products, loading } = useProducts();
  console.log(products[1]);
  if (loading) {
    return <Loader/>;
  }
 
  return (
    <div>
      {products.map((product) => (
        <ProductCard product={product} key={product.id}></ProductCard>
      ))}
    </div>
  );
};

export default ProductList;
