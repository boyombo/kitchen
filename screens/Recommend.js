import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ScrollView
} from "react-native";
import {
  Card,
  Button,
  Input,
  Avatar,
  Icon,
  ListItem
} from "react-native-elements";
import {
  orange,
  darkBlue,
  darkGray,
  mediumBlue,
  white,
  lightGray
} from "../constants/Colors";

var items = ["One", "Two", "Three", "four", "five", "six"];

export default class RecommendScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Invite Friends",
      barStyle: "light-content",
      headerStyle: {
        backgroundColor: mediumBlue
      },
      headerTintColor: white
    };
  };
  render() {
    return (
      <View>
        <ImageBackground
          source={require("../assets/utensil.png")}
          style={{ width: "100%", height: "100%", justifyContent: "center" }}
        >
          <ScrollView>
            <Card
              style={{ alignItems: "center", backgroundColor: "transparent" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Avatar
                  size="large"
                  rounded
                  icon={{
                    name: "bullhorn",
                    type: "material-community",
                    color: white
                  }}
                  overlayContainerStyle={{ backgroundColor: mediumBlue }}
                />
              </View>
              <View
                style={{
                  alignContent: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: 20,
                  marginBottom: 20
                }}
              >
                <Input
                  containerStyle={{ alignSelf: "center" }}
                  underlineColorAndroid="transparent"
                  placeholder="Phone Number"
                  rightIcon={
                    <Icon
                      name="contact-phone"
                      color={mediumBlue}
                      containerStyle={{ marginRight: 10 }}
                      onPress={() => console.log("pressed icon")}
                    />
                  }
                />
              </View>
              <View style={{ margin: 10 }}>
                {items.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item}
                    rightIcon={{ name: "remove-circle", color: "red" }}
                    bottomDivider
                  />
                ))}
              </View>
            </Card>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
