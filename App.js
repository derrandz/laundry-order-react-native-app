
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import NetInfo from "@react-native-community/netinfo"

import { Tutorial, NoInternet, SomethingWrong, LoadingLogo, SelectServices } from "./components";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigate, goBack, navigationRef, isReadyRef } from "./components/RootNavigation";

const Stack = createStackNavigator();

export default function App() {
  // useEffect(
  //   () => {
  //     const unsubscribe = NetInfo.addEventListener(state => {
  //       console.log('added event listener from netinfo')

  //       if ( !state.isConnected) {
  //         console.log('went offline')
  //         navigate('NoInternet')
  //       } else if (state.isConnected) {
  //         console.log('back online')
  //         const currentRoute = navigationRef.current?.getCurrentRoute()
  //         if (currentRoute.name === "NoInternet") {
  //           console.log('going back')
  //           goBack()
  //         }
  //       }
  //     })
      
  //     return function cleanup ()  {
  //       unsubscribe()
  //     }
  //   }
  // )

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator initialRouteName="LoadingLogo">
        <Stack.Screen name="LoadingLogo" component={LoadingLogo} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="SelectServices" component={SelectServices} />
        <Stack.Screen name="NoInternet" component={NoInternet} />
        <Stack.Screen name="SomethingWrong" component={SomethingWrong} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
