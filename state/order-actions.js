export const chooseType = (type) => ({
	type: "CHOOSE_TYPE",
	payload: type,
});

export const chooseOrderItem = (item) => ({
  type: "CHOOSE_ORDER_ITEM",
  payload: item
})

export const choosePickupDateTime = (datetime) => ({
	type: "CHOOSE_PICKUP_DATETIME",
	payload: datetime,
});

export const enterPickupAddress = (address) => ({
  type: "ENTER_PICKUP_ADDRESS",
  payload: address,
})

export const choosePickupLocation = (location) => ({
  type: "CHOOSE_PICKUP_GEOLOCATION",
  payload: location,
})
