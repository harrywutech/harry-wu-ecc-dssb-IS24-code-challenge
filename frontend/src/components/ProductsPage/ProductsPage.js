import React from "react";

import ProductsList from "./ProductsList";
import UseProductsPage from "./hooks/useProductsPage";

const ProductsPage = () => {
  const { products } = UseProductsPage({});
  
  return <ProductsList items={products} />;
};

export default ProductsPage;
