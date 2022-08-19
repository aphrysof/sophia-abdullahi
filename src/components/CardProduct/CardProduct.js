import React, { useContext } from "react";
import "./style.css";
import { AppContext } from "../../context";
import useCurrencyPrice from "../../hooks/useCurrenyPrice";

const CardProduct = ({ data, index }) => {
  const { toogleItemQuantity } = useContext(AppContext);
  //set state for cartItems

  const attributes = data.attributes;

  const { price } = useCurrencyPrice(data);

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

//  {
//    data?.attributes?.map((attribute) => (
//      <div key={attribute?.id} className="attribute">
//        <h6 className="attribute--names">{attribute?.name}</h6>
//        <div className="button--size">
//          {attribute.type === "swatch"
//            ? cartItem.colors.map((item) => (
//                <button
//                  key={item.id}
//                  style={{
//                    backgroundColor: data.colors ? item.value : null,
//                    border: data.colors ? "none" : null,
//                  }}
//                ></button>
//              ))
//            : cartItem.text.map((item) => (
//                <button key={item.id} className="values--button">
//                  {cartItem.text ? item.value : null}
//                </button>
//              ))}
//        </div>
//      </div>
//    ));
//  }
