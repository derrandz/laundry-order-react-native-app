import { RecyclerViewBackedScrollView } from "react-native";
import { combineReducers } from "redux";

const INITIAL_STATE = {
	newOrder: {
    type: "",
    pickup_datetime: "",
    pickup_address: "",
    pickup_geolocation: "",
    delivery_datetime: "",
    additional_notes: ""
  },
	orders: [],
	currentUser: {
    firstName: "",
    lastName: "",
    authToken: "",
    email: "",
  }
};

const globalStateReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case "CHOOSE_TYPE":
      return { ...state, newOrder: { ...state.newOrder, type: action.payload }}
      break;

    case "CHOOSE_ORDER_ITEM":
      return { ...state, newOrder: { ...state.newOrder, items: [...state.newOrder.items, action.payload] }}
      break;

    case "CHOOSE_PICKUP_DATETIME":
      return { ...state, newOrder: { ...state.newOrder, pickup_datetime: action.payload }}
      break;

    case "ENTER_PICKUP_ADDRESS":
      return { ...state, newOrder: { ...state.newOrder, pickup_address: action.payload }}
      break;

    case "CHOOSE_PICKUP_GEOLOCATION":
      return { ...state, newOrder: { ...state.newOrder, pickup_geolocation: action.payload }}
      break;

    default:
		return state
	}
};

export const globalReducer =  combineReducers({
	global: globalStateReducer,
});

