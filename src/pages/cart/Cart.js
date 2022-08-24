import React, { useContext } from "react";
import { AppContext } from "../../context";
import { CartLayout } from "../../layouts/index";
import { TotalPrice } from "../../components";

const Cart = () => {
  const { cart, getTotalPrice, getCartTotalItems } = useContext(AppContext);

  // const { price } = useCurrencyPrice();

  const handleClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <h1>CART</h1>
      {cart &&
        cart.map((product) => <CartLayout key={product.id} data={product} />)}
      <div className="cart--total" onClick={handleClick}>
        <p>
          Quantity:<span>{getCartTotalItems()}</span>
        </p>
        <p>
          Total:
          <span>
            {/* {price.currency.symbol} */}
            <TotalPrice />
          </span>
        </p>
        <button>order</button>
      </div>
    </>
  );
};

export default Cart;
