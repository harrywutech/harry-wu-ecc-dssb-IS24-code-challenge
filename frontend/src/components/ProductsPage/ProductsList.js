import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ProductList.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import UseProductItem from "../ProductItemPage/hooks/UseProductItem";
import { Button, Alert } from "react-bootstrap";

const ProductsList = (props) => {
  const { items } = props;

  const history = useHistory();

  const [selectProductId, setSelectProductId] = useState(null);

  const { successDel, countdown, handleDelete } = UseProductItem({
    productId: selectProductId,
  });

  if (successDel) {
    history.go(0);
  }

  if (!items) {
    return (
      <div className="center">
        <Alert Alert variant="danger">
          <h2>No products found.</h2>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <h2>View products: Total {items.length} Items </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Scrum Master</th>
            <th>Product Owner</th>
            <th>Developer Names</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.productOwnerName}</td>
              <td>
                {product && product.developers && product.developers.join(", ")}
              </td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>
                <a href={product.location} target="_blank">
                  {product.location}
                </a>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <Link
                    to={`/products/item/${product.productId}`}
                    style={{ marginRight: "5px" }}
                  >
                    <Button disabled={countdown}>{"View"}</Button>
                  </Link>
                  <Link
                    to={`/products/update/${product.productId}`}
                    style={{ marginRight: "5px" }}
                  >
                    <Button disabled={countdown}>{"Update"}</Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setSelectProductId(product.productId);
                      handleDelete(product.productId);
                    }}
                    disabled={countdown}
                  >
                    {"Delete"}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsList;
