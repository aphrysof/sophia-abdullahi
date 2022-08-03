import React from "react";
import { TechPageLayout } from "../../layouts";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../services/data";

const Tech = () => {
  const { data } = useQuery(CATEGORIES);
  return (
    <>
      <TechPageLayout data={data?.categories[2].products} />
    </>
  );
};

export default Tech;
