import React from "react";
import "./home.css";
import { Card } from "../../components";

const Home = (props) => {
  return (
    <div className="container">
      <h1>All</h1>
      <div className="cards--container">
        <Card data = {props.data}/>
      </div>
    </div>
  );
};

export default Home;
