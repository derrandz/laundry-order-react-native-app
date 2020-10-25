import React, { useEffect, useState } from "react";

import { View, Button, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signIn } from "../state/auth-actions";

import * as Facebook from "expo-facebook";
import * as SecureStore from 'expo-secure-store';

const appId = "3432796773467634";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '50%'
  },
  button: {
    alignSelf: 'flex-end',
  }
});

const storeAuthToken = async (token, expirationDate) => SecureStore.setItemAsync("token", token);

const logInWithFb = async (signIn) => {
  try {
    await Facebook.initializeAsync({
      appId,
    });
  } catch (e) {
    console.log("failed to initialize", JSON.stringify(e));
    return;
  }

  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['email'] });

    if (type === 'success') {
      await storeAuthToken(token);
      signIn(token);
    }
  } catch (error) {
    console.log("Failed to login:", JSON.stringify(error));
    console.error(`Facebook Login Error: ${error.message}`);
  }
}

function RegisterComponent (props) {
  const [ loginErrorMessage, showErrorMessage ] = useState({ message: "", display: false })
  
  useEffect(
    () => {
      if (props.currentUser.success === 1) {
        props.navigation.navigate('MakeOrder');
      } else if (props.currentUser.success === 2) {
        showErrorMessage({
          message: "Failed to login, please retry later or try using another facebook account",
          display: true,
        })
      }
    }
  , [
    props.currentUser.success,
  ]);

  return (
    <View style={styles.container}>
      {loginErrorMessage.display && <View>
        <Text>{loginErrorMessage.message}</Text>
      </View>}
      <View>
        <Button
          style={styles.button}
          title="Sign up with Facebook"
          onPress={
            () => {
              logInWithFb(props.signIn);
            }
          }
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return { currentUser: state.global.currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signIn }, dispatch);
};

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);