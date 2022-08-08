import React, { useState, useEffect, useContext } from "react";
import "./navbar.css";
import scandiweb from "../../assets/logo/logo-scandiweb.png";
import carts from "../../assets/Empty Cart.png";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context";
import { Modal } from "../index";

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const {getCartTotal } = useContext(AppContext);
  //re-render the notifications everytime the cart array changes
  useEffect(() => {
    setNotifications(getCartTotal);
  }, [getCartTotal]);

  const openModal = () => {
    setShowModal(!showModal);
    console.log("open modal");
  };

  return (
    <header>
      <nav>
        <div className="navlinks">
          <NavLink to="/">All</NavLink>
          <NavLink to="/clothes">Clothes</NavLink>
          <NavLink to="/tech">Tech</NavLink>
        </div>

        <div className="logo">
          <img src={scandiweb} alt="logo" />
        </div>
        <div className="currency--cart">
          <select>
            <option value="">USD</option>
            <option value="">EUR</option>
            <option value="">JYN</option>
          </select>
          <div className="shopping--cart">
            <div className="cart--button" onClick={openModal}>
              <img src={carts} alt="shopping cart" />
            </div>
            <div className="badge">{notifications}</div>
          </div>
        </div>
      </nav>
      { showModal ? <Modal setShowModal={setShowModal} /> : null}
    </header>
  );
};

export default Navbar;
