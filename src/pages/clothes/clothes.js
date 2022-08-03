import React from "react";
import { ClothesPageLayout } from "../../layouts";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../../services/data";

const Clothes = () => {
  const { data } = useQuery(CATEGORIES);
  return (
    <>
      <ClothesPageLayout data={data?.categories[1].products} />
    </>
  );
};

export default Clothes;
