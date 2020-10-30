import * as SecureStore from 'expo-secure-store';
import { Order } from "../adapters";

export const chooseType = (type) => ({
	type: "CHOOSE_TYPE",
	payload: type,
});

export const chooseWashWeight = (weight) => ({
  type: "CHOOSE_WASH_WEIGHT",
  payload: weight,
})

export const chooseCleanCount = (count) => ({
  type: "CHOOSE_CLEAN_COUNT",
  payload: count,
})

export const pickIronItem = (item) => ({
  type: "PICK_IRON_ITEM",
  payload: item,
})

export const choosePickupDate = (date) => ({
  type: "CHOOSE_PICKUP_DATE",
  payload: date,
});

export const choosePickupTime = (time) => ({
	type: "CHOOSE_PICKUP_TIME",
  payload: time,
});

export const enterPickupAddress = (address) => ({
  type: "ENTER_PICKUP_ADDRESS",
  payload: address,
});

export const enterPhoneNumber = (phonenumber) => ({
  type: "ENTER_PHONE_NUMBER",
  payload: phonenumber,
});

export const enterAdditionalNotes = (additional_notes) => ({
  type: "ENTER_ADDITIONAL_NOTES",
  payload: additional_notes,
});

export const choosePickupGeolocation = (location) => ({
  type: "CHOOSE_PICKUP_GEOLOCATION",
  payload: location,
});

export const startSubmittingNewOrder = () => ({ type: "SUBMIT_NEW_ORDER_INIT" });
export const submitNewOrderWithSuccess = () => ({ type: "SUBMIT_NEW_ORDER_SUCCESS" });
export const submitNewOrderWithFailure = () => ({ type: "SUBMIT_NEW_ORDER_FAILURE" });
export const submitNewOrder = () => async (dispatch, getState, Api) => {
  dispatch(startSubmittingNewOrder());
  
  console.log("submit new order");

  try {
    const state = getState();
    const order = Order(state.global.newOrder);

    console.log("sending to the server", { order });
    const token = await SecureStore.getItemAsync("token");
    
    await Api.CreateOrder(token, order);
  } catch (err) {
    console.log("failed to submit new order", err);
    dispatch(submitNewOrderWithFailure());
    return;
  }

  console.log("successfully submited new order");
  dispatch(submitNewOrderWithSuccess());
  return;
}
