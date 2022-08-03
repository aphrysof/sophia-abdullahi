import React from "react";
import "./navbar.css";
import scandiweb from "../../assets/logo/logo-scandiweb.png";
import cart from "../../assets/Empty Cart.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
          <button>
            <img src={cart} alt="shopping cart" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
