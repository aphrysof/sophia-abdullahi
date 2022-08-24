import React from "react";
import { ProductDescriptionLayout } from "../../layouts";
import { useQuery } from "@apollo/client";
import { PRODUCT_DETAILS } from "../../services/data";
import { useParams } from "react-router-dom";
import useCurrencyPrice from "../../hooks/useCurrenyPrice";

const Index = () => {
  //Using URLparam so as to navigate to the pdp as per the Id of the product.
  // Then set that id as the variables object
  const { id } = useParams();

  const { data } = useQuery(PRODUCT_DETAILS, {
    variables: { id: id },
  });

  const pricing = data?.product;
  const { price } = useCurrencyPrice(pricing);

  return data && data.product ? (
    <ProductDescriptionLayout
      data={{
        ...data?.product,
        quantity: 1,
        total: price.amount,
      }}
      attributes={data?.product?.attributes}
    />
  ) : null;
};

export default Index;
