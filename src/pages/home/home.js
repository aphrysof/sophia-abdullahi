import React, { Component } from "react";
import { HomePageLayout } from "../../layouts";

export class home extends Component {
  render() {
    return (
      <>
        <HomePageLayout data = {this.props.data} />
      </>
    );
  }
}

export default home;
