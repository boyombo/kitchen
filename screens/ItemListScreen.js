import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  ImageBackground
} from "react-native";
import { Card, Avatar, SearchBar } from "react-native-elements";
import { BASE_URL } from "../services/config";
import {
  darkGray,
  darkBlue,
  mediumBlue,
  lightGray,
  white
} from "../constants/Colors";

export default class ItemListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, utensils: [] };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    const idx = this.props.navigation.getParam("filter");
    console.log(idx);
    this._loadState(idx);
  };

  _loadState = async _filter => {
    this.setState({ isLoading: true });

    const token = await AsyncStorage.getItem("token");

    let url = BASE_URL + "/inventory/?use=" + _filter;
    console.log(url);
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
        this.setState({ isLoading: false, inventory: responseJson });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
        Alert.alert("could not load data");
      });
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
          <Text h5>Loading content...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/food.png")}
          style={{ width: "100%", height: "100%", opacity: 0.7 }}
          resizeMode="cover"
        >
          <SearchBar
            lightTheme
            onChangeText={() => console.log("searching...")}
            placeholder="Type Here..."
          />
          <FlatList
            data={this.state.inventory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card containerStyle={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between"
                  }}
                >
                  <Text>{item.inventorynumber}</Text>
                  <Text>R. {item.price}</Text>
                </View>
                <View
                  style={{
                    opacity: 1,
                    backgroundColor: lightGray,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                  }}
                >
                  <Avatar
                    size="large"
                    source={{ uri: item.imageurl }}
                    opacity={1}
                  />
                  <Text
                    style={{
                      color: mediumBlue,
                      fontSize: 20
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </Card>
            )}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  card: {
    backgroundColor: white,
    flex: 1,
    elevation: 2,
    borderRadius: 5,
    justifyContent: "space-around"
  }
});
