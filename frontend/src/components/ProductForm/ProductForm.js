import React, { useState } from "react";
import { Form, Input, Select } from "informed";
import { Button } from "react-bootstrap";
import useProductForm from "./hooks/useProductForm";
import { useRouteMatch } from 'react-router-dom';
import "./ProductForm.css";

const ProductForm = (props) => {
  const { updateProductId } = props;
  const match = useRouteMatch('/products/update/:id');
  const [addFormState, setAddFormState] = useState(null);
  const [updateFormState, setUpdateFormState] = useState(null);

  const {
    errorMessage,
    initialValues
  } = useProductForm({
    addFormState,
    updateFormState,
    updateProductId,
    setAddFormState,
    setUpdateFormState,
  });

  const renderForm = (
    <div className="form-wrapper">
      {errorMessage}
      <div className="form">
        <Form
          onSubmit={(formState) =>
            updateProductId && match
              ? setUpdateFormState(formState)
              : setAddFormState(formState)
          }
          initialValues={initialValues}
        >
          <label>
            Product Id:
            <Input field="productId" disabled />
          </label>
          <label>
            Product Name:
            <Input field="productName" required />
          </label>
          <label>
            Scrum Master:
            <Input field="scrumMasterName" required />
          </label>
          <label>
            Product Owner:
            <Input field="productOwnerName" required />
          </label>
          <label>
            Developers:
            <Input field="developer1" placeholder="Developer 1" required />
            <Input field="developer2" placeholder="Developer 2" />
            <Input field="developer3" placeholder="Developer 3" />
            <Input field="developer4" placeholder="Developer 4" />
            <Input field="developer5" placeholder="Developer 5" />
          </label>
          <label>
            Start Date:
            <Input field="startDate" required />
          </label>
          <label>
            Methodology:
            <Select field="methodology" required>
              <option value="" disabled>
                Select...
              </option>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Select>
          </label>
          <label>
            Location:
            <Input field="location" required />
          </label>
          <div>
            <Button type="submit">{"Save"}</Button>
          </div>
        </Form>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {renderForm}
    </React.Fragment>
  );
};

export default ProductForm;
