import React from "react";
import ProductForm from "../ProductForm/ProductForm";
import { useParams } from "react-router-dom";

const UpdateProductPage = () => {
  const { productId } = useParams();

  return (
    <React.Fragment>
      <h1>Update Product</h1>
      <ProductForm updateProductId={productId} />
    </React.Fragment>
  );
};

export default UpdateProductPage;
