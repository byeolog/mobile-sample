import React, { Component } from "react";
import Menu from "../menu/Menu";
import Content from "../contents/Content";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Content />
      </div>
    );
  }
}
