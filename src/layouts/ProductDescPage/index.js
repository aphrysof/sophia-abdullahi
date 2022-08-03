import React, { useState, useEffect } from "react";
import "./style.css";

const Index = (props) => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    setAttributes(props.attributes);
    console.log(props.attributes);
  }, [props.attributes]);

  const images = props.data?.gallery;
  // console.log(images);

  return (
    <>
      <div className="container--pdp">
        <div className="gallery">
          {images?.map((image, index) => (
            <div className="gallery--images" key={index}>
              <img src={image} alt="myimages" className="product--images" />
            </div>
          ))}
        </div>

        {/* {images.forEach(image => {
        console.log(image);
        <img src={image} alt = 'procutimage' className="product--images" />
      })} */}

        <div className="description--container">
          <div className="img--container">
            <img src={props.data?.gallery[0]} alt="productimage" />
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
                {props.data?.prices[0]?.currency?.symbol}{" "}
                {props.data?.prices[0]?.amount}
              </p>
            </div>
            <div className="addto_cart_btn">
              <button>ADD TO CART</button>
            </div>
            <div className="product_details">
              <p>{props.data?.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
