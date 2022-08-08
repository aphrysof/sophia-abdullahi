import { createContext, useState, useEffect } from "react";

//create global state
const AppContext = createContext({
  cart: [],
});

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
 

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
    setCart(cartCopy);
    //settind the product in the localstorage
    const cartProduct = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartProduct);
  };
  // getting sum total of the cart
  const getCartTotal = (id) => {
    return cart.reduce((sum, {quantity}) => sum + quantity, 0) ;
  }
  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        getCartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
