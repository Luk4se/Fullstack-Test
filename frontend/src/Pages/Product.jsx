import React from 'react';
import { useShop } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

function Product() {
  const { all_product, loading, error } = useShop();
  const { productId } = useParams();

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product.</p>;
 

  const product = all_product.find((element) => element.id === productId);

  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <ProductDisplay product={product} />
    </div>
  );
}

export default Product;
