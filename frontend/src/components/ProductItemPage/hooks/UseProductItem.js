import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const UseProductItem = (props) => {
  const { productId } = props;

  const [successDel, setSuccessDel] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const [productItem, setProductItem] = useState(null);

  //get product by id
  useEffect(() => {
    setIsLoading(true);
    const sendRequest = async () => {
      if(!productId) return null;
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

  //Delete product
  const handleDelete = async (productId) => {
    if(!productId) return null;
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

      history.push("/");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  return {
    productItem,
    successDel,
    isLoading,
    error,
    setSuccessDel,
    handleDelete,
  };
};

export default UseProductItem;
