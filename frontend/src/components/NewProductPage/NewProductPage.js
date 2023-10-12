import React from "react";
import ProductForm from "../ProductForm/ProductForm";
import "./NewProductPage.css";

const NewProductPage = () => {
  return (
    <React.Fragment>
      <div className="new-product-page-wrapper">
        <div className="new-product-page-container">
          <h2>New Product</h2>
          <ProductForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewProductPage;
