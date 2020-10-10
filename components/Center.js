import React from "react"
import { StyleSheet, View } from "react-native"

export function Center(props) {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
