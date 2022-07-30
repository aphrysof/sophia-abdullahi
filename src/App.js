import React from "react";
import {HomePageLayout} from './layouts/index'
import { useQuery } from "@apollo/client";
import { CARD_PRODUCTS } from "./services";


function App() {
  const { loading, error, data } = useQuery(CARD_PRODUCTS);
  console.log(data)
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  
  return (
    <div className="App">
      <HomePageLayout  
      data = {data?.category?.products}
      prices = {data?.category?.products?.prices}
      />
    </div>
  );
}

export default App;
