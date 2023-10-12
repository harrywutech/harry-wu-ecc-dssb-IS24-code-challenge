import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const UseProductForm = (props) => {
  const {
    addFormState,
    updateFormState,
    updateProductId,
    setAddFormState,
  } = props;

  const [successAdd, setSuccessAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [initialValues, setInitialValues] = useState({
    productId: "",
    productName: "",
    scrumMasterName: "",
    productOwnerName: "",
    developer1: "",
    developer2: "",
    developer3: "",
    developer4: "",
    developer5: "",
    startDate: "",
    methodology: "",
    location: "",
  });

  const history = useHistory();

  const handleClose = () => {
    setErrorMessage(null);
    setSuccessAdd(false);
  };

  //get product by id
  useEffect(() => {
    const sendRequest = async () => {
      if (!updateProductId) return null;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${updateProductId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setInitialValues({
          productId: responseData.product.productId,
          productName: responseData.product.productName,
          scrumMasterName: responseData.product.scrumMasterName,
          productOwnerName: responseData.product.productOwnerName,
          developer1: responseData.product.developers[0] || "",
          developer2: responseData.product.developers[1] || "",
          developer3: responseData.product.developers[2] || "",
          developer4: responseData.product.developers[3] || "",
          developer5: responseData.product.developers[4] || "",
          startDate: responseData.product.startDate,
          methodology: responseData.product.methodology,
          location: responseData.product.location,
        });
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    };
    sendRequest();
  }, [updateProductId]);

  useEffect(() => {
    if (!addFormState || !addFormState.values) {
      return;
    }

    const addProduct = async () => {
      let products = addFormState && addFormState.values;
      handleClose();
      if (!products) return null;

      products = {
        ...products,
        developers: [
          products.developer1,
          products.developer2,
          products.developer3,
          products.developer4,
          products.developer5,
        ].filter(Boolean),
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message);
          setAddFormState(null);
          setIsLoading(false);
        } else {
          setSuccessAdd(true);

          history.push("/");
        }

        return data;
      } catch (error) {
        setIsLoading(false);
        setAddFormState(null);
        setErrorMessage(error.message);
        console.error("Error:", error);
      }
    };

    addProduct();
  }, [addFormState, setAddFormState, history]);

  //update product
  useEffect(() => {
    if (!updateFormState || !updateFormState.values) {
      return;
    }

    const updateProduct = async () => {
      let products = updateFormState && updateFormState.values;

      if (!products) return null;

      products = {
        ...products,
        developers: [
          products.developer1,
          products.developer2,
          products.developer3,
          products.developer4,
          products.developer5,
        ].filter(Boolean),
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${updateProductId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message);
          setAddFormState(null);
          setIsLoading(false);
        } else {
          setSuccessAdd(true);

          history.push("/");
        }

        return data;
      } catch (error) {
        setErrorMessage(error.message);
        setAddFormState(null);
        setIsLoading(false);
        console.error("Error:", error);
      }
    };

    updateProduct();
  }, [updateFormState, setAddFormState, history, updateProductId]);

  return {
    isLoading,
    errorMessage,
    successAdd,
    handleClose,
    initialValues,
  };
};

export default UseProductForm;
