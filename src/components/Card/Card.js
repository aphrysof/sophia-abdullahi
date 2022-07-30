import React, { Component } from "react";
import "./card.css";
export class Card extends Component {
  render() {
    return (
      <>
        {this.props.data.map((data) => (
          <div className="card--container" key={data.id}>
            <div className="content--container">
              <img src={data?.gallery[0]} alt="product_image" />
              <div className="product--desc">
                <p className="product--name">{data?.name}</p>
                <p className="product--price">
                  {data?.prices[0]?.currency?.symbol} {data?.prices[0]?.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default Card;

//create a button then have the image inside then place the button absolute and the parent to position relative then
//on default display none then on hover of the card  display the button
// then style how it looks
