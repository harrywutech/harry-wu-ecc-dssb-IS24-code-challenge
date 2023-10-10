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
              <Input field="productId" disabled />
            ) : (
              <NumberInput field="productId" />
            )}
          </label>
          <label>
            Product Name:
            <Input field="productName" />
          </label>
          <label>
            Scrum Master:
            <Input field="scrumMasterName" />
          </label>
          <label>
          Product Owner:
            <Input field="productOwnerName" />
          </label>
          <label>
            Developers:
            <Input field="developer1" placeholder="Developer 1" />
            <Input field="developer2" placeholder="Developer 2" />
            <Input field="developer3" placeholder="Developer 3" />
            <Input field="developer4" placeholder="Developer 4" />
            <Input field="developer5" placeholder="Developer 5" />
          </label>
          <label>
            Start Date:
            <Input field="startDate" />
          </label>
          <label>
            Methodology:
            <Select field="methodology">
              <option value="" disabled>
                Select...
              </option>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Select>
          </label>
          <label>
            Location:
            <Input field="location" />
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
