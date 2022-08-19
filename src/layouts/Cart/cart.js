import React, { useContext } from "react";
import "./style.css";
import { AppContext } from "../../context";
import useCurrencyPrice from "../../hooks/useCurrenyPrice";

const Cart = ({ data }) => {
  const { toogleItemQuantity } =
    useContext(AppContext);

  const { price } = useCurrencyPrice(data);

  const attributes = data.attributes;


  return (
    <>
      <div className="cart--container">
        <div className="cart--item">
          <div className="item--detail">
            <div className="items--desc">
              <h3>{data.brand}</h3>
              <h4>{data.name}</h4>
              <h5>
                {price.currency?.symbol} {price.amount}
              </h5>
              {attributes.map((attribute) => (
                <div key={attribute?.id} className="cart--attribute">
                  <h6 className="cart--name">{attribute.name}</h6>
                  <div className="cart--button">
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
                          <button key={item.id} className="button--values">
                            {item.displayValue}
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
          <div className="item--image">
            <img src={data.gallery[0]} alt="img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
