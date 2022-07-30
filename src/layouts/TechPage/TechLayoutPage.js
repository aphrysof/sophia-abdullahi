import React, { Component } from "react";
import "./style.css";
import { Navbar, Card } from "../../components";

export class TechLayoutPage extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <h1>Tech</h1>
        <div className="cards--container">
          <Card data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default TechLayoutPage;
