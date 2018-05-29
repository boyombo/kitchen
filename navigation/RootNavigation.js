import React from "react";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import ItemListScreen from "../screens/ItemListScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import RecommendScreen from "../screens/Recommend";

const AppStack = createStackNavigator({
  Home: HomeScreen,
  ItemList: ItemListScreen,
  Recommend: RecommendScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen
});

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default class RootNavigation extends React.Component {
  render() {
    return <AppNavigator />;
  }
}
