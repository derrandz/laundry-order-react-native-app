import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export function shouldShowTutorial() {
  return AsyncStorage.getItem('watched-tutorial')
}

export function disableTutorial() {
  return AsyncStorage.setItem('watched-tutorial', 1)
}

export function enableTutorial() {
  return AsyncStorage.setItem('watched-tutorial', 0)
}

export function Tutorial (props) {
  return (<View>
    <Text>This is a slider</Text>
  </View>)
}
