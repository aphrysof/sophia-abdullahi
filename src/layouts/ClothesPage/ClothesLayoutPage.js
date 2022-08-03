import React from "react";
import "./style.css";
import { Card } from "../../components";

const ClothesLayoutPage = (props) => {
  return (
    <div className="container">
      <h1>Clothes</h1>
      <div className="cards--container">
        <Card data={props.data} />
      </div>
    </div>
  );
};

export default ClothesLayoutPage;
