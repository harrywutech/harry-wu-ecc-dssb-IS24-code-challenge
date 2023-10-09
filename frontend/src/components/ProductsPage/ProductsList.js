import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ProductList.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import UseProductItem from "../ProductItemPage/hooks/UseProductItem";
import { Button, Alert, Modal } from "react-bootstrap";

const ProductsList = (props) => {
  const { items } = props;

  const history = useHistory();

  if (!items) {
    return (
      <div className="center">
        <Alert Alert variant="danger">
          <h2>No products found.</h2>
        </Alert>
      </div>
    );
  }

  const [selectProductId, setSelectProductId] = useState(null);

  const { successDel, countdown, handleDelete } = UseProductItem({
    productId: selectProductId,
  });

  if (successDel) {
    setTimeout(() => {
      history.go(0);
    }, 5000);
  }

  if (!items) {
    return null;
  }

  return (
    <div>
      <h2>View products</h2>
      {successDel && (
        <Modal show={successDel}>
          <Alert variant="warning">
            <Modal.Header>
              <Modal.Title>{`Successfully Deleted Product Id: ${selectProductId}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{`You are returning to the product list page in ${countdown} seconds`}</p>
            </Modal.Body>
          </Alert>
        </Modal>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
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
