import React from "react";
import { ProductDescriptionLayout } from "../../layouts";
import { useQuery } from "@apollo/client";
import { PRODUCT_DETAILS } from "../../services/data";
import { useParams } from "react-router-dom";

const Index = () => {
  //Using URLparam so as to navigate to the pdp as per the Id of the product.
  // Then set that id as the variables object

  const { id } = useParams();
  const { data, loading, error } = useQuery(PRODUCT_DETAILS, {
    variables: { id },
  });

  console.log(data?.product);

  return (
    <>
      <ProductDescriptionLayout
        data={data?.product}
        attributes={data?.product?.attributes}
      />
    </>
  );
};

export default Index;
