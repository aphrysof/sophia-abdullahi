import React, { Component } from "react";
import "./navbar.css";
import scandiweb from "../../assets/logo/logo-scandiweb.png";
import cart from "../../assets/Empty Cart.png";

export class Navbar extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>All</li>
            <li>Clothes</li>
            <li>Tech</li>
          </ul>
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
  }
}

export default Navbar;
