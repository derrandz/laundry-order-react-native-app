import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

export function SomethingWrong () {
  return (
    <View>
      <View>
        <Icon
          name='hiking'
          type="font-awesome-5"
          size={70}
          color='black'
        />
      </View>
      <View>
        <Text>There is something wrong on our side... please retry later</Text>
        <Text>Thanks for your understanding...</Text>
      </View>
    </View>
  )
}
