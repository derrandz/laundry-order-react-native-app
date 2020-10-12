import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo'

import { ActivityIndicator, View } from 'react-native';
import { retryIn } from "./utils"
import { Center } from "./Center"

async function checkBackend () {
  return retryIn(10)(
    () => {
      return Promise.resolve({
        message: "Firebase not implemented yet"
      })
    }
  )
}

async function runHealthChecks () {

  try {
    await checkBackend()
  } catch (err) {
    throw {
      code: 'no-backend'
    }
  }
}

export function LoadingLogo({ navigation }) {
  /**
   * 0: initial
   * 1: healthy
   * 2: backend failure
   */
  const [ health, setHealth] = useState(0);
  const [ loading, setLoading ] = useState(1);
  
  runHealthChecks()
    .then(
      () => {
        setLoading(0)
        setHealth(1)
      }
    )
    .catch(
      (error) => {
        setLoading(0)
        setHealth(2)
      }
    )

  useEffect(
    () => {
      if (!loading) {
        if (health === 2) {
          navigation.navigate('SomethingWrong')
        } else {
          navigation.navigate('MakeOrder')
        }
      }
    }
  )

  return (
    <Center>
      <View>
        <ActivityIndicator size="large"/>
      </View>
    </Center>
  );
}
