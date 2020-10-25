import 'react-native-gesture-handler';

import React from 'react';
import Thunk from 'redux-thunk';

import * as Api from './api';

import { Tutorial, NoInternet, SomethingWrong, LoadingLogo, MakeOrder, Register } from "./components";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { globalReducer } from "./state/global-reducer";

const Stack = createStackNavigator();
const store = createStore(
  globalReducer,
  applyMiddleware(Thunk.withExtraArgument(Api))
);

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
					<Stack.Screen options={{ headerShown: false }}name="Register" component={Register} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
  );
}
