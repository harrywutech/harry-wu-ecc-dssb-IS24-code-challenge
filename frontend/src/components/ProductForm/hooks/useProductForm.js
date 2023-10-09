import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const UseProductForm = (props) => {
  const {
    addFormState,
    updateFormState,
    updateProductId,
    setAddFormState,
    setUpdateFormState,
  } = props;

  const [successAdd, setSuccessAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [initialValues, setInitialValues] = useState({
    product_id: "",
    product_name: "",
    product_description: "",
    product_colour: "",
    product_size: "",
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
          product_id: responseData.product.product_id,
          product_name: responseData.product.product_name,
          product_description: responseData.product.product_description,
          product_colour: responseData.product.product_colour,
          product_size: responseData.product.product_size,
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
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message);
          setAddFormState(null);
          setIsLoading(false);
        } else {
          setCountdown(5);
          setSuccessAdd(true);
          setTimeout(() => {
            history.push("/");
          }, 5000);
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
  }, [addFormState]);

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
          setCountdown(5);
          setSuccessAdd(true);
          setTimeout(() => {
            history.push("/");
          }, 5000);
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
  }, [updateFormState]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return {
    isLoading,
    errorMessage,
    successAdd,
    handleClose,
    countdown,
    initialValues,
  };
};

export default UseProductForm;
