import React, { useState, useEffect, useContext } from "react";
import "./navbar.css";
import scandiweb from "../../assets/logo/logo-scandiweb.png";
import carts from "../../assets/Empty Cart.png";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context";
import { Modal } from "../index";

const Navbar = ({ data }) => {
  const { getCartTotalItems, setCurrentCurrency, currentCurrency } =
    useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [currencies, setCurrentCurrencies] = useState([]);

  //create a variable then assign it to the destructured data;
  const currArray = data.currencies;

  useEffect(() => {
    //get value from localStorage
    const value = localStorage.getItem("currency");
    if (data) {
      //find the object based on the value
      const newCurrencies = data.currencies.find(
        (item) => item.label === value
      );
      //find if that object exist in the array
      const found = data.currencies.find(
        (element) => element === newCurrencies
      );
      if (found) {
        // create a copy of the variable created
        const currCopy = [...currArray];
        const fromIndex = currCopy.indexOf(found);
        const toIndex = 0;
        //use splice method to remove the object
        const element = currCopy.splice(fromIndex, 1)[0];
        //use splice to insert that particular object at index 0
        currCopy.splice(toIndex, 0, element);

        setCurrentCurrencies(currCopy);
      }
      //if the localstorage is empty setCurrenctCurrencies to the original array
      else if (value === null) {
        setCurrentCurrencies(currArray);
      }
    }
  }, [data, currArray]);

  const openModal = () => {
    setShowModal(!showModal);
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
          <select
            onChange={(e) => {
              setCurrentCurrency(e.target.value);
              localStorage.setItem("currency", e.target.value);
            }}
            defaultValue={currentCurrency}
          >
            {currencies &&
              currencies.map((option, index) => (
                <option key={index} value={option.label}>
                  {option.symbol} {option.label}
                </option>
              ))}
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
