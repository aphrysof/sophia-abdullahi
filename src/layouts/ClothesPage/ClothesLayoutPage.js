import React, { Component } from "react";
import "./style.css";
import { Navbar, Card } from "../../components";

export class ClothesLayoutPage extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <h1>Clothes</h1>
        <div className="cards--container">
          <Card data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default ClothesLayoutPage;
