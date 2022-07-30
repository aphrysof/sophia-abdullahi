import React, { Component } from "react";
import { TechPageLayout } from "../../layouts";

export class tech extends Component {
  render() {
    return (
      <>
        <TechPageLayout data = {this.props.data} />
      </>
    );
  }
}

export default tech;
