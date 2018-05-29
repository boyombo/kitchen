import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Card, Button, Input, Avatar } from "react-native-elements";
import {
  orange,
  darkBlue,
  darkGray,
  mediumBlue,
  white,
  lightGray
} from "../constants/Colors";
import { BASE_URL } from "../services/config";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      country: "",
      pwd1: "",
      pwd2: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentDidMount() {
    console.log("loaded signup screen");
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
          <Text h5>Please hang on a bit...</Text>
        </View>
      );
    }
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ImageBackground
          source={require("../assets/utensil.png")}
          style={{ width: "100%", height: "100%", justifyContent: "center" }}
        >
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
                  name: "silverware-variant",
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
                placeholder="First name (username)"
                onChangeText={first_name => this.setState({ first_name })}
              />
              <Input
                containerStyle={{ alignSelf: "center" }}
                underlineColorAndroid="transparent"
                placeholder="Last name"
                onChangeText={last_name => this.setState({ last_name })}
              />
              <Input
                containerStyle={{ alignSelf: "center" }}
                underlineColorAndroid="transparent"
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              />
              <Input
                containerStyle={{ alignSelf: "center" }}
                underlineColorAndroid="transparent"
                placeholder="Phone"
                keyboardType="phone-pad"
                onChangeText={phone => this.setState({ phone })}
              />
              <Input
                containerStyle={{ alignSelf: "center" }}
                underlineColorAndroid="transparent"
                placeholder="Country"
              />
              <Text style={{ marginTop: 10 }} />
              <Input
                containerStyle={{
                  alignSelf: "center"
                }}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={pwd1 => this.setState({ pwd1 })}
              />
              <Input
                containerStyle={{
                  alignSelf: "center"
                }}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                placeholder="Confirm password"
                onChangeText={pwd2 => this.setState({ pwd2 })}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                buttonStyle={{ backgroundColor: mediumBlue }}
                title="Sign Up! "
                onPress={this._signUpAsync}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                outline
                buttonStyle={{ backgroundColor: darkGray }}
                title="Have an account? Login! "
                onPress={this._login}
              />
            </View>
          </Card>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }

  _signUpAsync = async () => {
    this.setState({ isLoading: true });
    let url = BASE_URL + "/add/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.first_name,
          password: this.state.pwd1,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email
        },
        country: 1,
        phone: this.state.phone
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        let usr = responseJson.user;
        if (!usr) {
          console.error("Could not create your login, please try later");
          Alert.alert("Could not create your account!");
        } else {
          this.setState({ isLoading: false });
          this.props.navigation.navigate("Login");
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
        Alert.alert("Could not create your login");
      });
  };

  _login = () => {
    this.props.navigation.navigate("Login");
  };
}
