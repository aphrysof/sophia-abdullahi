import { useQuery } from "@apollo/client";
import { createContext, useState, useEffect } from "react";
import { CARD_PRODUCTS, CATEGORIES } from "../services/data";

//create global state
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState({
    currency: {
      symbol: "$",
    },
    amount: 0,
  });

  //fetching data
  const { data } = useQuery(CARD_PRODUCTS);
  const allProducts = data?.category?.products;

  const changeCurrency = (e) => {
    const { value } = e.target;
    console.log("checking input", e.target.value);

    // const found = allProducts?.map((product) => {
    //   return {
    //     ...product,
    //     prices: product.prices.filter(
    //       (price) => price.currency.symbol === value
    //     ),
    //   };
    // });
    // const newProducts = found;
    // console.log(newProducts);
    // setProducts(newProducts);

    allProducts?.map((product) => {
      if (product) {
        const found = product?.prices.find(
          (price) => price?.currency?.symbol === value
        );
        if (found) {
          setPrice(found);
          console.log(found);
        }
      }
    });
  };

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
  let foundProduct;
  const toogleItemQuantity = (id, value) => {
    const newCart = localStorage.getItem("cart");
    const cartItem = JSON.parse(newCart);
    console.log(cartItem);

    foundProduct = cartItem.find((item) => item.id === id);
    const newCartItems = cartItem.filter((item) => item.id !== id);

    if (value === "inc") {
      if (foundProduct) {
        setCart([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ]);
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...newCartItems,
            {
              ...foundProduct,
              quantity: foundProduct.quantity + 1,
            },
          ])
        );
      }
    } else if (value === "dec") {
      if (foundProduct) {
        setCart([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...newCartItems,
            {
              ...foundProduct,
              quantity: foundProduct.quantity - 1,
            },
          ])
        );
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
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice + product?.prices?.amount * product.quantity
    );
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
  const getTotalPrice = () => {
    return cart.reduce(
      (previous, current) =>
        previous + current.prices[0].amount * current.quantity,
      0
    );
  };
  

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        getCartTotalItems,
        price,
        changeCurrency,
        totalPrice,
        toogleItemQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
