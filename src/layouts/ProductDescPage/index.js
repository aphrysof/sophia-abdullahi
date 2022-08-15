import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { AppContext } from "../../context";

const Index = (props) => {
  const [attributes, setAttributes] = useState([]);
  const { addItem, price, quantity } = useContext(AppContext);

  useEffect(() => {
    setAttributes(props.attributes);
  }, [props.attributes]);

  const images = props.data?.gallery;
  const product = props.data;

  return (
    <div className="container--pdp">
      <div className="gallery">
        {images?.map((image, index) => (
          <div className="gallery--images" key={index}>
            <img src={image} alt="myimages" className="product--images" />
          </div>
        ))}
      </div>

      <div className="description--container">
        <div className="img--container">
          <img
            src={product.gallery ? product.gallery[0] : ""}
            alt="productimage"
          />
        </div>
        <div className="product--description">
          <h2>{props.data?.brand}</h2>
          <p>{props.data?.name}</p>
          {attributes &&
            attributes.map((attribute) => (
              <div key={attribute.id}>
                <h5 className="attribute--name">{attribute.name}</h5>
                <div className="size--section">
                  {attribute.items.map((item) => (
                    <div className="button--sizes" key={item.id}>
                      <button
                        style={{
                          backgroundColor:
                            attribute.type === "swatch" ? item.value : null,
                          border: attribute.type === "swatch" ? "none" : null,
                        }}
                      >
                        {attribute.type === "text" ? item.displayValue : null}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <div className="price--section">
            <h5>PRICES</h5>
            <p>
              {" "}
              {product.prices[0].currency?.symbol} {product.prices[0].amount}
            </p>
          </div>
          <div className="addto_cart_btn">
            <button onClick={() => addItem(product, quantity)}>
              ADD TO CART
            </button>
          </div>
          <div className="product_details">
            <p>{product.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
