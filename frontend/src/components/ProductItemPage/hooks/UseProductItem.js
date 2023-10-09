import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const UseProductItem = (props) => {
  const { productId } = props;
  
  const [successDel, setSuccessDel] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const [productItem, setProductItem] = useState(null);

  //get product by id
  useEffect(() => {
    setIsLoading(true);
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setProductItem(responseData.product);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    sendRequest();
  }, [productId]);

  const handleDelete = async (productId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete the product.");
      }
  
      setIsLoading(false);
      setSuccessDel("Product deleted successfully.");
      setCountdown(5);
      setTimeout(() => {
        history.push("/");
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return {
    productItem,
    successDel,
    isLoading,
    error,
    setSuccessDel,
    handleDelete,
    countdown,
  };
};

export default UseProductItem;
