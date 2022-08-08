import React, { useState, useEffect, useContext } from "react";
import "./card.css";
import Cart from "../../assets/Vector.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context";

const Card = (props) => {
  //Setting state for product
  const [products, setProducts] = useState([]);

  const { addItem } = useContext(AppContext);
  //SetProducts to props.data so that we can map through it using the products variable.
  useEffect(() => {
    setProducts(props.data);
    console.log(props.data);
  }, [props.data]);

  const navigate = useNavigate();

  //Using URLparam so as to navigate to the pdp as per the Id of the product.
  
  
  return (
    <>
      {products &&
        products.map((product) => (
          <div className="card--container" key={product.id}>
            <div className="content--container">
              <img
                src={product.gallery[0]}
                alt="product_image"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <div className="add_to_cart">
                <button onClick={() => {console.log('clicked')}}>
                  <img src={Cart} alt="cart" />
                </button>
              </div>
              <div className="product--desc">
                <p className="product--name">{product.name}</p>
                <p className="product--price">
                  {product?.prices[0]?.currency?.symbol}{" "}
                  {product?.prices[0]?.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
// // import React, { Component } from "react";

// // class Card extends Component {

// //   render() {
// //     return (
// //       <>
// //

// // export default Card;

// //create a button then have the image inside then place the button absolute and the parent to position relative then
// //on default display none then on hover of the card  display the button
// // then style how it looks
