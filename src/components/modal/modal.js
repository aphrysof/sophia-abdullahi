import React, { useState, useContext, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { AppContext } from "../../context";
import { Link } from "react-router-dom";

const Modal = ({ setShowModal }) => {
  const {
    cart,
    price,
    toogleItemQuantity,
    totalPrice,
    getCartTotalItems,
    getTotalPrice,
  } = useContext(AppContext);

  //set state for cartItems
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cart) {
      const products = cart.map((product) => {
        if (product.attributes) {
          const attribute = product.attributes.find(
            (attr) => attr.id === "Color"
          );
          return {
            ...product,
            colors: attribute ? attribute.items : [],
          };
        } else {
          return {
            ...product,
            colors: [],
          };
        }
      });
      setCartItems(products);
    } else {
      setCartItems([]);
    }
  }, [cart]);

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
                My Bag<span> {getCartTotalItems()} items</span>
              </h6>
            </div>
            {cartItems.length < 1 && (
              <div className="cart--header">
                <p>Your shopping cart is empty</p>
                <Link to="/">
                  <button
                    className="continue--shopping"
                    onClick={() => setShowModal(false)}
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}

            {cartItems.length >= 1 &&
              cartItems.map((cartItem) => (
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
                        <div key={attribute?.id}>
                          <h6 className="attribute--name">{attribute?.name}</h6>
                          <div className="attribute--section">
                            {cartItem.colors.map((item) => (
                              <div className="button--sizes" key={item?.id}>
                                <button
                                  style={{
                                    backgroundColor:
                                      cartItem.attributes?.type === "swatch"
                                        ? item?.value
                                        : null,
                                    border:
                                      cartItem.attributes?.type === "swatch"
                                        ? "none"
                                        : null,
                                  }}
                                >
                                  {cartItem?.attribute?.type === "text"
                                    ? item?.displayValue
                                    : null}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="quantity--buttons">
                      <button
                        onClick={() => toogleItemQuantity(cartItem.id, "inc")}
                      >
                        +
                      </button>
                      {cartItem.quantity}
                      <button
                        onClick={() => toogleItemQuantity(cartItem.id, "dec")}
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div className="image">
                    <img src={cartItem?.gallery[0]} alt="img" />
                  </div>
                </div>
              ))}
            {cartItems.length >= 1 && (
              <>
                <div className="total--amount">
                  <h6>Total</h6>
                  <h6>{getTotalPrice()}</h6>
                </div>
                <div className="buttons--container">
                  <button className="view--bag">VIEW BAG</button>
                  <button className="checkout">CHECKOUT</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
