import React, { useState, useContext, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.css";
import { AppContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { CardProduct } from "../index";

const Modal = ({ setShowModal }) => {
  const { cart, price, getCartTotalItems, getTotalPrice } =
    useContext(AppContext);

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

  const navigate = useNavigate();

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
            {cartItems.length >= 1 && <CardProduct />}

            {cartItems.length >= 1 && (
              <>
                <div className="total--amount">
                  <h6>Total</h6>
                  <h6>{getTotalPrice}</h6>
                </div>
                <div className="buttons--container">
                  <button
                    className="view--bag"
                    onClick={() => {
                      navigate("/cart");
                      setShowModal(false);
                    }}
                  >
                    VIEW BAG
                  </button>
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
