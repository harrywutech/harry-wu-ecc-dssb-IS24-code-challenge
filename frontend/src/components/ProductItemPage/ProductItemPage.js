import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import UseProductItem from "./hooks/UseProductItem";
import {
  Button,
  Alert,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
  Modal,
} from "react-bootstrap";

const ProductItemPage = () => {
  const { productId } = useParams();

  const { productItem, isLoading, handleDelete, successDel, countdown } =
    UseProductItem({
      productId,
    });

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (!productItem) {
    return (
      <div className="center">
        <Alert Alert variant="danger">
          <h2>No product found.</h2>
          <Link to="/">
            <Button variant="danger">
              {"Go Back to Product Listing Page"}
            </Button>
          </Link>
        </Alert>
      </div>
    );
  }

  return (
    <React.Fragment>
      {successDel && (
        <Modal show={successDel}>
          <Alert variant="warning">
            <Modal.Header>
              <Modal.Title>{`Successfully Deleted ${productItem.product_name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{`You are returning to the product list page in ${countdown} seconds`}</p>
            </Modal.Body>
          </Alert>
        </Modal>
      )}
      {!successDel && (
        <div className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{productItem.product_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {"Product ID: " + productItem.product_id}
              </Card.Subtitle>
              <Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <b>{"Product Colour: "}</b>
                    {productItem.product_colour}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>{"Product Description: "}</b>
                    {productItem.product_description}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>{"Product Size: "}</b>
                    {productItem.product_size}
                  </ListGroupItem>
                </ListGroup>
              </Card.Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                }}
              >
                <Link
                  to={`/products/update/${productItem.product_id}`}
                  style={{ marginRight: "10px" }}
                >
                  <Button disabled={isLoading || countdown}>{"Update"}</Button>
                </Link>
                <Button
                  variant="primary"
                  onClick={() => handleDelete(productItem.product_id)}
                  disabled={isLoading || countdown}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductItemPage;
