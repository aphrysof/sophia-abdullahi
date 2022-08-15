import React, { useState, useEffect, useContext } from "react";
import "./navbar.css";
import scandiweb from "../../assets/logo/logo-scandiweb.png";
import carts from "../../assets/Empty Cart.png";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context";
import { Modal } from "../index";

const Navbar = ({ data }) => {
  const { getCartTotalItems, changeCurrency } =
    useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  //re-render the notifications everytime the cart array changes
  // useEffect(() => {
  //   setNotifications(getCartTotal);
  // }, [getCartTotal]);

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
          <select onChange={(e) => changeCurrency(e)} defaultValue={"$"}>
            <option value="$">$ USD</option>
            <option value="£">£ GBP</option>
            <option value="A$">A$ AUD</option>
            <option value="¥">¥ JPY</option>
            <option value="₽">₽ RUB</option>
          </select>
          <div className="shopping--cart">
            <div className="cart--button" onClick={openModal}>
              <img src={carts} alt="shopping cart" />
            </div>
            <div className="badge">{getCartTotalItems()}</div>
          </div>
        </div>
      </nav>
      {showModal ? <Modal setShowModal={setShowModal} /> : null}
    </header>
  );
};

export default Navbar;
