import { createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { PRICES } from "../services/data";

//create global state
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { data } = useQuery(PRICES);
  const currency = data.currencies.map((item) => item.label);

  const [cart, setCart] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState(currency[0]);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      setCurrentCurrency(savedCurrency);
    }
  }, []);

  //useffect to get product from the localstorage
  useEffect(() => {
    const item = localStorage.getItem("cart");
    if (item) {
      const cartItem = JSON.parse(item);
      setCart(cartItem);
    } else {
      setCart([]);
    }
  }, []);

  //updating item quantity in cart function
  //updating the quantity based on the id of the product and the value of the button either increment or decrement

  const toogleItemQuantity = (id, value) => {
    const newCart = localStorage.getItem("cart");
    const cartItem = JSON.parse(newCart);
    //create a copy of the array
    const cartCopy = cartItem.slice();

    //first we need to findIndex of the product based on the id
    const itemIndex = cartCopy.findIndex((product) => product.id === id);

    //then create a variable and set the array against the objects index
    let newItem = cartCopy[itemIndex];

    if (value === "inc") {
      if (newItem) {
        //increase the objects quantity by one
        newItem.quantity++;
        //then remove the object and replace it with the newItem
        cartCopy.splice(itemIndex, 1, newItem);
        setCart(cartCopy);
        localStorage.setItem("cart", JSON.stringify(cartCopy));
      }
    } else if (value === "dec") {
      if (newItem.quantity > 1) {
        newItem.quantity--;
        cartCopy.splice(itemIndex, 1, newItem);
        setCart(cartCopy);
        localStorage.setItem("cart", JSON.stringify(cartCopy));
      }
    }
  };

  //adding item to cart
  const addItem = (product) => {
    //first lets create a copy of our cart so that we don't mess up the original array
    const cartCopy = [...cart];

    //finding the item if it exist in the array
    let findExistingProduct = cartCopy.find((item) => item?.id === product?.id);

    //if the item exist i want to increase its quantity else spread that product and set the quantity to 1
    if (findExistingProduct) {
      findExistingProduct.quantity++;
    } else {
      findExistingProduct = {
        ...product,
        quantity: 1,
      };
      //then push the product in array
      cartCopy.push(findExistingProduct);
    }
    alert(`${product.quantity} ${product.name} added to the cart`);
    setCart(cartCopy);
    //settind the product in the localstorage
    const cartProduct = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartProduct);
  };

  // getting quantity sum total of the cart
  const getCartTotalItems = () => {
    return cart.reduce((sum, { quantity }) => sum + quantity, 0);
  };

  //get total price of the cart items
  const getTotalPrice = cart
    .reduce(function (previousValue, currentValue) {
      return (
        previousValue + currentValue.prices[0].amount * currentValue.quantity
      );
    }, 0)
    .toFixed(2);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        getCartTotalItems,
        currentCurrency,
        setCurrentCurrency,
        toogleItemQuantity,
        getTotalPrice,
        currency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

//What to work on next;
//getting the total prices
//then updating per index of the product- starting
