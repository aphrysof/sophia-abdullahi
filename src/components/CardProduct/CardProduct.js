import React, { useContext, useEffect } from "react";
import "./style.css";
import { AppContext } from "../../context";
import useCurrencyPrice from "../../hooks/useCurrenyPrice";

const CardProduct = ({ data }) => {
  const { toogleItemQuantity, cart, currentCurrency } = useContext(AppContext);
  //set state for cartItems

  const attributes = data.attributes;

  const { price } = useCurrencyPrice(data);

  useEffect(() => {
    const cartCopy = [...cart];
    const itemIndex = cartCopy.findIndex((product) => product.id === data.id);
    const newProduct = cartCopy[itemIndex];
    if (newProduct) {
      newProduct.total = price.amount;
      cartCopy.splice(itemIndex, 1, newProduct);
      console.log(cartCopy);
      localStorage.setItem("cart", JSON.stringify(cartCopy));
    }
  }, [cart, price.amount, data, currentCurrency]);

  // close the modal when clicking outside the modal.
  return (
    <>
      <div className="productItem--container">
        <div className="item--details">
          <div className="details">
            <div className="name--price">
              <p>{data.brand}</p>
              <p>{data?.name}</p>
              <h6>
                {" "}
                {price.currency.symbol} {price.amount}
              </h6>
            </div>
            {attributes.map((attribute) => (
              <div className="attribute" key={attribute.id}>
                <h6 className="attribute--names">{attribute?.name}</h6>
                <div className="button--size">
                  {attribute.type === "swatch"
                    ? attribute.items.map((item) => (
                        <button
                          key={item.id}
                          style={{
                            backgroundColor: item.value,
                            border: "none",
                          }}
                        ></button>
                      ))
                    : attribute.items.map((item) => (
                        <button key={item.id} className="values--button">
                          {item.value}
                        </button>
                      ))}
                </div>
              </div>
            ))}
          </div>
          <div className="quantity--buttons">
            <button onClick={() => toogleItemQuantity(data.id, "inc")}>
              +
            </button>
            {data.quantity}
            <button onClick={() => toogleItemQuantity(data.id, "dec")}>
              -
            </button>
          </div>
        </div>
        <div className="image">
          <img src={data?.gallery[0]} alt="img" />
        </div>
      </div>
    </>
  );
};

export default CardProduct;
