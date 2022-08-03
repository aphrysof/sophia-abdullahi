import React from "react";
import { HomePageLayout } from "../../layouts";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../services/data";

const Home = () => {
  const { data } = useQuery(CATEGORIES);

  return (
    <>
      <HomePageLayout data = {data?.categories[0].products}/>
    </>
  );
};

export default Home;
