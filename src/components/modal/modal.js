import React, { useState, useContext, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { AppContext } from "../../context";

const Modal = ({ setShowModal }) => {
  const { cart, getCartTotal } = useContext(AppContext);

  //set state for cartItems
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // useEffect(() => {
  //   setAttributes(cart.attributes);
  //   console.log(cart.attributes);
  // }, [cart.attributes]);

  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  return ReactDOM.createPortal(
    <>
      <div className="modal--container" ref={modalRef} onClick={closeModal}>
        <div className="modal">
          <div className="product--container">
            <div className="header">
              <h6>
                My Bag<span> {getCartTotal()} items</span>
              </h6>
            </div>
            {cartItems &&
              cartItems.map((cartItem) => (
                <div className="productItem--container" key={cartItem.id}>
                  <div className="item--details">
                    <div className="details">
                      <div className="name--price">
                        <p>{cartItem?.brand}</p>
                        <p>{cartItem?.name}</p>
                        <h6>
                          {" "}
                          {cartItem?.prices[0]?.currency?.symbol}{" "}
                          {cartItem?.prices[0]?.amount}
                        </h6>
                      </div>
                      {cartItem?.attributes?.map((attribute) => (
                        <div key={attribute?.id}>
                          <h6 className="attribute--name">{attribute?.name}</h6>
                          <div className="size--section">
                            {cartItem?.attribute?.items?.map((item) => (
                              <div className="button--sizes" key={item?.id}>
                                <button
                                style={{
                                  backgroundColor:
                                    attribute?.type === "swatch"
                                      ? "item?.value"
                                      : null,
                                  border:
                                    attribute?.type === "swatch"
                                      ? "none"
                                      : null,
                                }}
                                >
                                  {attribute?.type === "text"
                                    ? item.displayValue
                                    : null}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="quantity--buttons">
                      <button>+</button>
                      {getCartTotal()}
                      <button>-</button>
                    </div>
                  </div>
                  <div className="image">
                    <img src={cartItem?.gallery[0]} alt="img" />
                  </div>
                </div>
              ))}
            <div className="total--amount">
              <h6>Total</h6>
              <h6>value</h6>
            </div>
            <div className="buttons--container">
              <button className="view--bag">VIEW BAG</button>
              <button className="checkout">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
