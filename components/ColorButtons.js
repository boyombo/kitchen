import React, { Component } from "react";
import { Button } from "react-native-elements";
import {
  orange,
  darkBlue,
  darkGray,
  mediumBlue,
  white,
  lightGray
} from "../constants/Colors";

export default class ColorButton extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    const colors = ["black", orange, darkBlue, "brown"];
    const rand = colors[Math.floor(Math.random() * colors.length)];
    console.log(rand);
    this.state = { color: rand };
  }
  render() {
    let color = this.state.color;
    console.log(color);
    return (
      <Button
        titleStyle={{
          color: color,
          fontWeight: "bold",
          fontSize: 18
        }}
        buttonStyle={{
          width: 120,
          height: 120,
          backgroundColor: white,
          borderColor: color,
          borderWidth: 2,
          opacity: 0.7,
          marginRight: 10,
          marginBottom: 10,
          borderRadius: 10
        }}
      />
    );
  }
}
