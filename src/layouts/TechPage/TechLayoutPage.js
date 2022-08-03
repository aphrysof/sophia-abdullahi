import React from "react";
import "./style.css";
import { Card } from "../../components";

const TechLayoutPage = (props) => {
  return (
    <div className="container">
      <h1>Tech</h1>
      <div className="cards--container">
        <Card data = {props.data} />
      </div>
    </div>
  );
};

export default TechLayoutPage;
