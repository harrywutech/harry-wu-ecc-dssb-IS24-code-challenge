import { useEffect, useState } from "react";

const UseProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);
 
  //get all products
  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`
        );
        const responseData = await response.json();
       
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setProducts(responseData.products);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    sendRequest();
  }, []);

  return {
    products,
    isLoading,
    error,
  };
};

export default UseProductsPage;
