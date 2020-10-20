
import 'react-native-gesture-handler';

import React from 'react';

import { Tutorial, NoInternet, SomethingWrong, LoadingLogo, MakeOrder } from "./components";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from "react-redux";
import { createStore} from "redux";
import { globalReducer } from "./state/global-reducer";

const Stack = createStackNavigator();
const store = createStore(globalReducer)

export default function App() {

  return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="LoadingLogo">
					<Stack.Screen options={{ headerShown: false }}name="LoadingLogo" component={LoadingLogo} />
					<Stack.Screen options={{ headerShown: false }}name="Tutorial" component={Tutorial} />
					<Stack.Screen options={{ headerShown: false }}name="MakeOrder" component={MakeOrder} />
					<Stack.Screen options={{ headerShown: false }}name="NoInternet" component={NoInternet} />
					<Stack.Screen options={{ headerShown: false }}name="SomethingWrong" component={SomethingWrong} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
  );
}
