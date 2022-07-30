import React, { Component } from "react";
import "./home.css";
import { Navbar, Card } from "../../components";

export class Home extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <h1>All</h1>
        <div className="cards--container">
          <Card 
          data = {this.props.data}
          prices = {this.props.prices}
          />
        </div>
      </div>
    );
  }
}

export default Home;
