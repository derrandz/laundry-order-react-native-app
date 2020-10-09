import { Icon } from 'react-native-elements';
import React, { useState } from 'react';
import { View } from 'react-native';
import { NoInternet } from "./NoInternet"
import { SomethingWrong } from "./SomethingWrong"
import axios from "axios"

async function checkInternet () {
  return axios.get('https://www.google.com')
}

async function checkBackend () {
  return Promise.resolve({
    message: "Firebase not implemented yet"
  })
}

async function runHealthChecks () {
  try {
    await checkInternet()
  } catch (err) {
    throw {
      code: 'no-internet'
    }
  }

  try {
    await checkBackend()
  } catch (err) {
    throw {
      code: 'no-backend'
    }
  }
}

export function LoadingLogo(props) {
  /**
   * 0: initial
   * 1: healthy
   * 2: internet failure
   * 3: backend failure
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
        setHealth(
          error.code === 'no-internet' ? 2 : 3
        )
      }
    )
  
  const renderFailureComponent = (successComponent) => {
    if (health === 2) return (<NoInternet />)
    else if (health === 3) return (<SomethingWrong />)
    else return (<View>{successComponent}</View>)
  }

  return (
    <View>
    {
      loading
        ? <Icon
            name='dryer|washer'
            type="font-awesome-5"
            size={70}
            color='black'
          />
        : {...renderFailureComponent(props.children)}
    }
    </View>
  );
}
