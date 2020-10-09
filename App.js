import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { shouldShowTutorial, Tutorial, LoadingLogo, SelectServices } from "./components";

export default function App() {
  const [ seenTutorial, setTutorialStatus ] = useState(0)

  shouldShowTutorial().then((stuto) => setTutorialStatus(stuto))

  return (
    <View style={styles.container}>
      <LoadingLogo>
        {
          seenTutorial
            ? <SelectServices />
            : <Tutorial>
              <SelectServices />
            </Tutorial>
        }
      </LoadingLogo>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
