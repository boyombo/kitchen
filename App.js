import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import RootNavigation from "./navigation/RootNavigation";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    return (
      <View style={styles.container}>
        <RootNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
