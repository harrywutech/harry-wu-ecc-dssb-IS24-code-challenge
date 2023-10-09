import React, { useState } from "react";
import { Form, Input, Select, TextArea } from "informed";
import { Button, Alert, Modal } from "react-bootstrap";
import useProductForm from "./hooks/useProductForm";
import { NumberInput } from "./NumberInput";
import "./ProductForm.css";

const ProductForm = (props) => {
  const { updateProductId } = props;

  const [addFormState, setAddFormState] = useState(null);
  const [updateFormState, setUpdateFormState] = useState(null);

  const { errorMessage, successAdd, handleClose, countdown, initialValues } =
    useProductForm({
      addFormState,
      updateFormState,
      updateProductId,
      setAddFormState,
      setUpdateFormState,
    });

  const renderForm = (
    <div className="form-wrapper">
      <div className="form">
        <Form
          onSubmit={(formState) =>
            updateProductId
              ? setUpdateFormState(formState)
              : setAddFormState(formState)
          }
          initialValues={initialValues}
        >
          <label>
            Product Id:
            {updateProductId != null ? (
              <Input field="product_id" disabled />
            ) : (
              <NumberInput field="product_id" />
            )}
          </label>
          <label>
            Product Name:
            <Input field="product_name" />
          </label>
          <label>
            Product Description:
            <TextArea field="product_description" />
          </label>
          <label>
            Product Colour:
            <Input field="product_colour" />
          </label>
          <label>
            Product Size:
            <Select field="product_size">
              <option value="" disabled>
                Select...
              </option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Select>
          </label>
          <div>
            <Button type="submit">{updateProductId ? "Update" : "Save"}</Button>
          </div>
        </Form>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {(errorMessage || successAdd) && (
        <Modal show={errorMessage || successAdd} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{errorMessage ? "Error" : "Success"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant={errorMessage ? "danger" : "success"}>
              {errorMessage ||
                (successAdd && (
                  <p>{`You are returning to the product list page in ${countdown} seconds`}</p>
                ))}
            </Alert>
          </Modal.Body>
          {errorMessage && (
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {"Close"}
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      )}

      {renderForm}
    </React.Fragment>
  );
};

export default ProductForm;
