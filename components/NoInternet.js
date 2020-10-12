import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Center } from "./Center"

export function NoInternet () {
  return (
    <Center>
      <View>
        <View>
          <Icon
            name='unlink'
            type="font-awesome-5"
            size={70}
            color='black'
          />
        </View>
        <View>
          <Text>Please check your internet connection</Text>
        </View>
      </View>
    </Center>
  )
}
