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
