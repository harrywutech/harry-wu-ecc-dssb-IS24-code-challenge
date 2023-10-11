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

  const { productItem, isLoading, handleDelete, successDel } =
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
        <Alert variant="danger">
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
      {!successDel && (
        <div className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{productItem.productName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {"Product ID: " + productItem.productId}
              </Card.Subtitle>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <b>{"Scrum Master: "}</b>
                    {productItem.scrumMasterName}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>{"Product Owner: "}</b>
                    {productItem.productOwnerName}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>{"Developer Names: "}</b>
                    {productItem && productItem.developers && productItem.developers.join(', ')}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>{"Start Date: "}</b>
                    {productItem.startDate}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>{"Methodology: "}</b>
                    {productItem.methodology}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>{"Location: "}</b>
                    <a href={productItem.location} target="_blank">{productItem.location}</a>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "50%",
                }}
              >
                <Link
                  to={`/products/update/${productItem.productId}`}
                  style={{ marginRight: "10px" }}
                >
                  <Button disabled={isLoading}>{"Update"}</Button>
                </Link>
                <Button
                  variant="primary"
                  onClick={() => handleDelete(productItem.productId)}
                  disabled={isLoading}
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
