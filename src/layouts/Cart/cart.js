import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { AppContext } from "../../context";
import { CardProduct } from "../../components";

const Cart = () => {
  const { cart, price, toogleItemQuantity, getCartTotalItems, getTotalPrice } =
    useContext(AppContext);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cart) {
      const products = cart.map((product) => {
        if (product.attributes) {
          const attribute = product.attributes.find(
            (attr) => attr.type === "swatch"
          );
          const texts = product.attributes.find((attr) => attr.type === "text");
          return {
            ...product,
            colors: attribute ? attribute.items : [],
            text: texts ? texts.items : [],
          };
        } else {
          return {
            ...product,
            colors: [],
            text: [],
          };
        }
      });
      setCartItems(products);
    } else {
      setCartItems([]);
    }
  }, [cart]);

  return (
    <>
    <h1>CART</h1>
    <div className="cart--container">
      {cartItems.map((product) => (
        <div className="cart--item" key={product.id}>
          <div className="item--detail">
            <div className="items--desc">
              <h3>{product.brand}</h3>
              <h4>{product.name}</h4>
              <h5>
                {product.prices[0].currency?.symbol} {product.prices[0].amount}
              </h5>
              {product?.attributes?.map((attribute) => (
                <div key={attribute?.id} className="cart--attribute">
                  <h6 className="cart--name">{attribute?.name}</h6>
                  <div className="cart--button">
                    {attribute.type === "swatch"
                      ? product.colors.map((item) => (
                          <button
                            key={item.id}
                            style={{
                              backgroundColor: product.colors
                                ? item.value
                                : null,
                              border: product.colors ? "none" : null,
                            }}
                          ></button>
                        ))
                      : product.text.map((item) => (
                          <button key={item.id} className="button--values">
                            {product.text ? item.value : null}
                          </button>
                        ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="quantity--buttons">
              <button onClick={() => toogleItemQuantity(product.id, "inc")}>
                +
              </button>
              {product.quantity}
              <button onClick={() => toogleItemQuantity(product.id, "dec")}>
                -
              </button>
            </div>
          </div>
          <div className="item--image">
            <img src={product?.gallery[0]} alt="img" />
          </div>
        </div>
      ))}
      <div
        className="cart--total"
        onClick={() => console.log("thank you for shopping with us")}
      >
        <p>
          Quantity:<span>{getCartTotalItems()}</span>
        </p>
        <p>
          Total:
          <span>
            {price.currency.symbol}
            {getTotalPrice}
          </span>
        </p>
        <button>order</button>
      </div>
    </div>
    </>
  );
};

export default Cart;
