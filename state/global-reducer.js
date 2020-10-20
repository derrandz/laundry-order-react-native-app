import { combineReducers } from "redux";

const INITIAL_STATE = {
	newOrder: {
    type: "",
    details: {
      pickup_date: new Date(),
      pickup_time: new Date(),
      pickup_address: "",
      pickup_geolocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      delivery_datetime: "",
      additional_notes: ""
    },
    wash: {
      weight: "",
    },
    clean: {
      count: 1,
    },
    iron: {
      items: [],
    }
  },
  orders: [],
  items: ['shirt', 'jacket', 'trousers'],
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

    case "CHOOSE_WASH_WEIGHT":
      return { ...state, newOrder: { ...state.newOrder, wash: { weight: action.payload } } }
      break;

    case "CHOOSE_CLEAN_COUNT":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          clean: { count: action.payload }
        }
      }
      break;

    case "PICK_IRON_ITEM":
      const item = action.payload;

      let newItems = [...state.newOrder.iron.items]

      if (newItems.includes(item)) {
        newItems = [ ...newItems.filter((i) => item !== i) ]
      } else {
        newItems = [ ...newItems, item ]
      }
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          iron: {
            items: newItems,
          }
        }
      }
      break;

    case "CHOOSE_PICKUP_DATE":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            pickup_date: action.payload,
          }
        },
      }
      break;
    
    case "CHOOSE_PICKUP_TIME":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            pickup_time: action.payload,
          },
        },
      }
      break;
    
    case "ENTER_PICKUP_ADDRESS":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            pickup_address: action.payload,
          }
        }
      }
      break;

    case "CHOOSE_PICKUP_GEOLOCATION":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            pickup_geolocation: action.payload
          }
        }
      }
      break;

    default:
		return state
	}
};

export const globalReducer =  combineReducers({
	global: globalStateReducer,
});

