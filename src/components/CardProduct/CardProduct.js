import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { AppContext } from "../../context";

const CardProduct = () => {
  const { cart, price, toogleItemQuantity } = useContext(AppContext);

  //set state for cartItems
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

  // close the modal when clicking outside the modal.
  return (
    <>
      {cartItems.map((cartItem) => (
        <div className="productItem--container" key={cartItem.id}>
          <div className="item--details">
            <div className="details">
              <div className="name--price">
                <p>{cartItem?.brand}</p>
                <p>{cartItem?.name}</p>
                <h6>
                  {" "}
                  {cartItem.prices[0].currency?.symbol}{" "}
                  {cartItem.prices[0].amount}
                </h6>
              </div>
              {cartItem?.attributes?.map((attribute) => (
                <div key={attribute?.id} className="attribute">
                  <h6 className="attribute--names">{attribute?.name}</h6>
                  <div className="button--size">
                    {attribute.type === "swatch"
                      ? cartItem.colors.map((item) => (
                          <button
                            key={item.id}
                            style={{
                              backgroundColor: cartItem.colors
                                ? item.value
                                : null,
                              border: cartItem.colors ? "none" : null,
                            }}
                          ></button>
                        ))
                      : cartItem.text.map((item) => (
                          <button key={item.id} className="values--button">
                            {cartItem.text ? item.value : null}
                          </button>
                        ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="quantity--buttons">
              <button onClick={() => toogleItemQuantity(cartItem.id, "inc")}>
                +
              </button>
              {cartItem.quantity}
              <button onClick={() => toogleItemQuantity(cartItem.id, "dec")}>
                -
              </button>
            </div>
          </div>
          <div className="image">
            <img src={cartItem?.gallery[0]} alt="img" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CardProduct;
