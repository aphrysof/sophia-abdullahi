import React, { Component } from "react";
import { ClothesPageLayout } from "../../layouts";

export class clothes extends Component {
  render() {
    return (
      <>
      <ClothesPageLayout data = {this.props.data} />
      </>
    )
  }
}

export default clothes;
