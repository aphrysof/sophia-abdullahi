import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";

const useCurrencyPrice = (product) => {
  const { currentCurrency } = useContext(AppContext);
  const [price, setPrice] = useState({
    currency: {
      symbol: "$",
      label: "USD",
    },
    amount: 0,
  });

  useEffect(() => {
    if (product && currentCurrency) {
      const found = product.prices.find(
        (price) => price.currency?.label === currentCurrency
      );
      if (found) {
        setPrice(found); 
      }
    }
  }, [product, currentCurrency]);
  return { price };
};

export default useCurrencyPrice;
