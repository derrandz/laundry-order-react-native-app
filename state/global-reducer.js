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
      phone_number: "",
      additional_notes: "",
      submitting: false,
      done: false,
      success: false,
    },
    wash: {
      weight: 0,
    },
    clean: {
      count: 1,
    },
    iron: {
      items: [],
    }
  },
  orders: {
    list: [],
    state: {
      fetching: false,
      done: false,
      success: false,
    }
  },
  items: ['shirt', 'jacket', 'trousers'],
	currentUser: {
    firstName: "",
    lastName: "",
    authToken: "",
    email: "",
    facebookUserId: "",
    success: 0,
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
    
    case "ENTER_PHONE_NUMBER":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            phone_number: action.payload,
          }
        }
      };
      break;

    case "ENTER_ADDITIONAL_NOTES":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            additional_notes: action.payload,
          }
        }
      };
      break;

    case "SAVE_CURRENT_USER":
      return {
        ...state,
        currentUser: {
          ...action.payload,
          success: 1,
        }
      }
      break;
    
    case "FETCH_CURRENT_USER_FAILED":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          success: 2,
        }
      }
      break;
    
    case "FLUSH_OUT_CURRENT_USER":
      return {
        ...state,
        currentUser: {
          firstName: "",
          lastName: "",
          email: "",
          facebookUserId: "",
        }
      }
      break;

    case "SUBMIT_NEW_ORDER_INIT":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            submitting: true,
            done: false,
            success: false,
          }
        }
      }
      break;

    case "SUBMIT_NEW_ORDER_SUCCESS":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            submitting: false,
            done: true,
            success: true,
          }
        }
      }
      break;

    case "SUBMIT_NEW_ORDER_FAILURE":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          details: {
            ...state.newOrder.details,
            submitting: false,
            done: true,
            success: false,
          }
        }
      }
      break;


    
    case 'FETCH_MY_ORDERS_INIT':
      return {
        ...state,
        orders: {
          list: [],
          state: {
            fetching: true,
            done: false,
            success: false,
          }
        }
      };
      break;

    case 'FETCH_MY_ORDERS_SUCCEEDED':
      return {
        ...state,
        orders: {
          list: action.payload,
          state: {
            fetching: false,
            done: true,
            success: true,
          }
        }
      };
      break;

    case 'FETCH_MY_ORDERS_FAILUED':
      return {
        ...state,
        orders: {
          list: [],
          state: {
            fetching: false,
            done: true,
            success: false,
          }
        }
      };
      break;

    default:
      return state
	}
};

export const globalReducer =  combineReducers({
	global: globalStateReducer,
});
