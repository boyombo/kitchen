import React, { Component } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  StatusBar,
  View,
  ActivityIndicator,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar, Text } from "react-native-elements";
import {
  orange,
  darkBlue,
  darkGray,
  mediumBlue,
  white,
  lightGray
} from "../constants/Colors";
import ActionButton from "react-native-action-button";
import { BASE_URL } from "../services/config";
import ColorButton from "../components/ColorButtons";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, categories: [] };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentDidMount() {
    this._loadInitialState();
  }

  _loadInitialState = async () => {
    this.setState({ isLoading: true });
    const token = await AsyncStorage.getItem("token");

    console.log(token);
    let url = BASE_URL + "/use/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ isLoading: false, categories: responseJson });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
        Alert.alert("Could not load data");
      });
  };

  render() {
    const colors = ["black", orange, darkBlue, "brown", "red", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (this.state.isLoading === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
          <Text h5>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/kitchen.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        >
          <TouchableOpacity
            style={{
              backgroundColor: white,
              flex: 1,
              opacity: 0.7,
              alignItems: "center",
              margin: 10,
              borderColor: mediumBlue,
              borderRadius: 10,
              borderWidth: 2
            }}
          >
            <Text style={{ fontSize: 40 }}>Advert Bar</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 8,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "transparent",
                width: 300,
                height: 300,
                flexWrap: "wrap",
                opacity: 0.8
              }}
            >
              {this.state.categories.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    backgroundColor: white,
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                    borderColor: mediumBlue,
                    borderRadius: 10,
                    borderWidth: 2,
                    width: 120,
                    height: 120
                  }}
                  onPress={() => this._showMoreApp(idx)}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      color: colors[idx]
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <ActionButton buttonColor={orange}>
              <ActionButton.Item
                buttonColor={mediumBlue}
                title="Logout"
                onPress={this._signOutAsync}
              >
                <Icon name="md-log-out" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </View>
          <View style={{ flex: 1, backgroundColor: orange }}>
            <TouchableOpacity onPress={this._recommend}>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Avatar
                    size="large"
                    icon={{
                      name: "people",
                      color: mediumBlue
                    }}
                    overlayContainerStyle={{
                      height: "100%",
                      backgroundColor: lightGray
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 10
                  }}
                >
                  <Text
                    style={{
                      color: white,
                      fontWeight: "bold",
                      alignContent: "center",
                      alignSelf: "center"
                    }}
                  >
                    RECOMMEND US TO YOUR FRIENDS
                  </Text>
                  <Text style={{ color: white }}>
                    And win premium memberships!
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  _showMoreApp = idx => {
    // No slug or id to filter by so we have to use this
    // await AsyncStorage.setItem("useFilter", idx + 1);
    let idxFilter = idx + 1;
    this.props.navigation.navigate("ItemList", { filter: idxFilter });
  };

  _recommend = () => {
    // console.log("recommend");
    this.props.navigation.navigate("Recommend");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: StatusBar.currentHeight
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
