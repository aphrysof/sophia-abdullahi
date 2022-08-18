import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { AppContext } from "../../context";
import useCurrencyPrice from "../../hooks/useCurrenyPrice";

const Index = ({ data }) => {
  const [attributes, setAttributes] = useState([]);
  const { addItem, quantity } = useContext(AppContext);

  const { price } = useCurrencyPrice(data);
  useEffect(() => {
    setAttributes(data.attributes);
  }, [data.attributes]);

  const images = data.gallery;
  const product = data;

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
          <h2>{data?.brand}</h2>
          <p>{data?.name}</p>
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
              {price.currency.symbol} {price.amount}
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
