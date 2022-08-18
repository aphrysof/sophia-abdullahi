import React, { useState, useEffect } from "react";
import "./card.css";
import Cart from "../../assets/Vector.png";
import { useNavigate } from "react-router-dom";
import useCurrencyPrice from "../../hooks/useCurrenyPrice";

const Product = ({ data }) => {

  const navigate = useNavigate();

  const { price } = useCurrencyPrice(data);
  return (
    <div className="card--container">
      <div className="content--container">
        <img
          src={data.gallery[0]}
          alt="product_image"
          onClick={() => navigate(`/product/${data.id}`)}
        />
        <div className="add_to_cart">
          <button
            onClick={() => {
              console.log("clicked");
            }}
          >
            <img src={Cart} alt="cart" />
          </button>
        </div>
        <div className="product--desc">
          <p className="product--name">{data.name}</p>
          {}
          <p className="product--price">
            {price.currency?.symbol} {price.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

const Card = ({ data }) => {
  //Setting state for product
  const [products, setProducts] = useState([]);

  //SetProducts to props.data so that we can map through it using the products variable.
  useEffect(() => {
    setProducts(data);
  }, [data]);

  //Using URLparam so as to navigate to the pdp as per the Id of the product.

  return (
    <>
      {products &&
        products.map((product) => <Product key={product.id} data={product} />)}
    </>
  );
};

export default Card;
